import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'AI service not configured. Please set GEMINI_API_KEY.' },
        { status: 500 }
      );
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    console.log('Summarizing note:', { title, contentLength: content.length });
    const result = await aiService.summarizeNote(title, content);
    console.log('Summary result:', result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Summarization error:', error);
    console.error('Error details:', error.message, error.stack);
    return NextResponse.json(
      { error: `Failed to summarize note: ${error.message}` },
      { status: 500 }
    );
  }
}
