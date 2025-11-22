import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize Gemini client
// The API key is guaranteed to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (
  history: { role: 'user' | 'model'; content: string }[],
  message: string
): Promise<string> => {
  try {
    // We use gemini-2.5-flash for fast, responsive chat
    const modelId = 'gemini-2.5-flash';
    
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // Add the new user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

export const analyzeText = async (text: string): Promise<string> => {
    try {
        const prompt = `
        Please analyze the following excerpt from a student's "Teacher's Survival Guide" based on the grading rubric.
        
        Specifically check for:
        1. **Grammatical Inversion**: Is it used? Is it correct? (Highlight this).
        2. **Paragraph Structure**: Identify the Topic Sentence, Supporting Sentences, and Concluding Sentence.
        3. **Vocabulary**: Is it professional/academic?
        
        Text to analyze:
        "${text}"
        
        Provide a concise, constructive critique.
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
             config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
        
        return response.text || "Analysis failed.";

    } catch (error) {
        console.error("Error analyzing text:", error);
        return "Sorry, I encountered an error while analyzing your text.";
    }
}