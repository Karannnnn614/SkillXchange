import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { createRatingSchema } from '@/schemas/validation';

// Mock ratings repository
class RatingRepository {
  private static ratings: any[] = [
    {
      id: '1',
      swapRequestId: '1',
      raterId: 'user-1',
      ratedUserId: 'user-2',
      rating: 5,
      feedback: 'Excellent teacher! Very patient and knowledgeable in Python.',
      skillQualityRating: 5,
      communicationRating: 5,
      reliabilityRating: 4,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      swapRequestId: '2',
      raterId: 'user-3',
      ratedUserId: 'user-1',
      rating: 4,
      feedback: 'Great video editing skills and very professional.',
      skillQualityRating: 4,
      communicationRating: 5,
      reliabilityRating: 4,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  static async getByUserId(userId: string) {
    return this.ratings.filter((rating) => rating.ratedUserId === userId);
  }

  static async getBySwapRequestId(swapRequestId: string) {
    return this.ratings.filter((rating) => rating.swapRequestId === swapRequestId);
  }

  static async create(data: any) {
    // Check if rating already exists for this swap request and rater
    const existingRating = this.ratings.find(
      (rating) => rating.swapRequestId === data.swapRequestId && rating.raterId === data.raterId
    );

    if (existingRating) {
      throw new Error('Rating already exists for this swap request');
    }

    const newRating = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
    };

    this.ratings.push(newRating);
    return newRating;
  }

  static async getUserAverageRating(userId: string) {
    const userRatings = this.ratings.filter((rating) => rating.ratedUserId === userId);

    if (userRatings.length === 0) {
      return {
        averageRating: 0,
        totalRatings: 0,
        skillQualityAvg: 0,
        communicationAvg: 0,
        reliabilityAvg: 0,
      };
    }

    const totalRating = userRatings.reduce((sum, rating) => sum + rating.rating, 0);
    const skillQualityTotal = userRatings.reduce(
      (sum, rating) => sum + (rating.skillQualityRating || 0),
      0
    );
    const communicationTotal = userRatings.reduce(
      (sum, rating) => sum + (rating.communicationRating || 0),
      0
    );
    const reliabilityTotal = userRatings.reduce(
      (sum, rating) => sum + (rating.reliabilityRating || 0),
      0
    );

    return {
      averageRating: Math.round((totalRating / userRatings.length) * 10) / 10,
      totalRatings: userRatings.length,
      skillQualityAvg: Math.round((skillQualityTotal / userRatings.length) * 10) / 10,
      communicationAvg: Math.round((communicationTotal / userRatings.length) * 10) / 10,
      reliabilityAvg: Math.round((reliabilityTotal / userRatings.length) * 10) / 10,
    };
  }
}

async function getRatingsHandler(req: any) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const swapRequestId = searchParams.get('swapRequestId');

  let ratings;

  if (userId) {
    ratings = await RatingRepository.getByUserId(userId);
  } else if (swapRequestId) {
    ratings = await RatingRepository.getBySwapRequestId(swapRequestId);
  } else {
    return NextResponse.json(
      { error: 'Missing parameter', message: 'userId or swapRequestId is required' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: 'Ratings retrieved successfully',
      ratings,
    },
    { status: 200 }
  );
}

async function createRatingHandler(req: any, ratingData: any) {
  try {
    const rating = await RatingRepository.create({
      ...ratingData,
      raterId: req.user.userId,
    });

    return NextResponse.json(
      {
        message: 'Rating created successfully',
        rating,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Rating creation failed', message: error.message },
      { status: 400 }
    );
  }
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getRatingsHandler);

export const POST = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(createRatingSchema)
)(createRatingHandler);
