import { NextRequest, NextResponse } from 'next/server';
import { combineMiddleware, withAuth, withErrorHandling } from '@/lib/middleware';

// Mock ratings repository (same as main route)
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

  static async getUserAverageRating(userId: string) {
    const userRatings = this.ratings.filter((rating) => rating.ratedUserId === userId);

    if (userRatings.length === 0) {
      return {
        averageRating: 0,
        totalRatings: 0,
        skillQualityAvg: 0,
        communicationAvg: 0,
        reliabilityAvg: 0,
        recentRatings: [],
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
      recentRatings: userRatings
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    };
  }
}

async function getUserRatingStatsHandler(req: any, { params }: { params: { userId: string } }) {
  const stats = await RatingRepository.getUserAverageRating(params.userId);

  return NextResponse.json(
    {
      message: 'User rating stats retrieved successfully',
      stats,
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getUserRatingStatsHandler);
