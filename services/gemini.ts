
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askProtocolQuestion = async (question: string, context: string) => {
  const prompt = `
    You are an expert on the OCPP 1.6 (Open Charge Point Protocol) specification.
    Based on the following context and your deep knowledge of the protocol, answer the user's question.
    
    Context:
    ${context}
    
    User Question:
    ${question}
    
    Provide a clear, technical, and accurate answer. Use markdown for formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "I'm sorry, I couldn't process that request right now. Please try again later.";
  }
};
