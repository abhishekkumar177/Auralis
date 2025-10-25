import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { notes } = await request.json();

    if (!notes || !Array.isArray(notes)) {
      return NextResponse.json(
        { error: 'Notes array is required' },
        { status: 400 }
      );
    }

    const categories = await aiService.generateInsights(notes);
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Insights error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
