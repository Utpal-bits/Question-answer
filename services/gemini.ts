import { GoogleGenAI, Type } from "@google/genai";
import { BookContext, Concept, ResearchData } from "../types";

// Initialize Gemini Client
// IMPORTANT: The API key must be obtained exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_FAST = "gemini-2.5-flash";
// Using flash for search as well, or we could use pro if reasoning needs are higher. 
// Flash is generally sufficient for summarization + search.

export const generateDailyConcepts = async (
  book: BookContext,
  day: number
): Promise<Concept[]> => {
  try {
    const prompt = `
      Act as an expert educational tutor. The user is reading the book "${book.title}" ${book.author ? `by ${book.author}` : ''}.
      ${book.contentSnippet ? `Here is a snippet of the content: "${book.contentSnippet.substring(0, 2000)}..."` : ''}

      Generate a curriculum for Day ${day}. 
      Extract exactly 5 distinct, high-impact concepts from this book that are suitable for learning on this day.
      For each concept, provide a clear title, a brief description (1-2 sentences), and a detailed explanation (3-4 sentences) helping the user 'rewire' their understanding.

      Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_FAST,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["title", "description", "explanation"],
          },
        },
      },
    });

    const data = JSON.parse(response.text || "[]");
    
    return data.map((item: any, index: number) => ({
      id: `day-${day}-concept-${index}`,
      title: item.title,
      description: item.description,
      explanation: item.explanation,
    }));

  } catch (error) {
    console.error("Error generating concepts:", error);
    throw new Error("Failed to generate daily concepts. Please try again.");
  }
};

export const fetchResearchAndNews = async (
  concept: string,
  bookTitle: string
): Promise<ResearchData> => {
  try {
    const prompt = `
      Find the latest research, scientific studies, news, or real-world applications related to the concept "${concept}" 
      specifically in the context of the topics discussed in the book "${bookTitle}".
      
      Summarize the findings in 2 paragraphs. Focus on new discoveries or modern validations of this concept.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_FAST,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text || "No recent research found.";
    
    // Extract sources from grounding chunks
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    // Remove duplicates based on URI
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

    return {
      summary,
      sources: uniqueSources,
    };

  } catch (error) {
    console.error("Error fetching research:", error);
    return {
      summary: "Unable to fetch latest research at this time.",
      sources: []
    };
  }
};