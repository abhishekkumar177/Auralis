import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface AIResponse {
  summary: string;
  tags: string[];
}

export const aiService = {
  async summarizeNote(title: string, content: string): Promise<AIResponse> {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash'
    });

    const prompt = `
You are an AI assistant helping users organize their notes. Given the following note, provide:
1. A concise summary (2-3 sentences max)
2. 3-5 relevant tags/keywords

Note Title: ${title}
Note Content: ${content}

Respond in JSON format:
{
  "summary": "your summary here",
  "tags": ["tag1", "tag2", "tag3"]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        summary: parsed.summary || '',
        tags: parsed.tags || [],
      };
    }

    return {
      summary: 'Unable to generate summary',
      tags: [],
    };
  },

  async generateInsights(notes: Array<{ title: string; content: string; tags?: string[] }>): Promise<string[]> {
    if (notes.length === 0) return [];

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const notesText = notes.map((note, idx) =>
      `Note ${idx + 1}: ${note.title}\nContent: ${note.content.substring(0, 200)}...`
    ).join('\n\n');

    const prompt = `
Analyze these notes and identify the top 3-5 main themes or categories they cover.
Return only the category names as a JSON array.

${notesText}

Respond in JSON format:
["category1", "category2", "category3"]
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return [];
  },
};
