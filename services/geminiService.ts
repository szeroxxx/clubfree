
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
       config: {
        systemInstruction: "You are a helpful assistant for a freelancer. Your responses should be concise, professional, and directly address the user's request. Format text with markdown where appropriate.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text from Gemini:", error);
    return "Error: Unable to generate text. Please check your API key and network connection.";
  }
};
