import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase, verifySeededData } from '@/lib/seed-database';

export async function POST(request: NextRequest) {
  try {
    // Only allow seeding in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Database seeding is not allowed in production' },
        { status: 403 }
      );
    }

    const result = await seedDatabase();
    
    if (result.success) {
      return NextResponse.json({
        message: result.message,
        stats: result.stats,
        status: 'success'
      });
    } else {
      return NextResponse.json(
        { error: result.message, details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to seed database', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const verification = await verifySeededData();
    
    return NextResponse.json({
      message: 'Database verification completed',
      data: verification,
      status: 'success'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify database', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
