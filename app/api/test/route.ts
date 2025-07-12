import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      message: 'Backend is working!',
      timestamp: new Date().toISOString(),
      status: 'success',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Backend error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: 'POST request received',
      data: body,
      timestamp: new Date().toISOString(),
      status: 'success',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Backend error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
