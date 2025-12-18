
import { GoogleGenAI } from "@google/genai";
import { AgeGroup } from "../types";

// Note: Using process.env.API_KEY as per system instruction
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gets age-appropriate response from Gemini (referenced as ChatGPT in UI)
 */
export const getChatGPTResponse = async (
  ageGroup: AgeGroup,
  cardContext: string,
  userMessage: string
): Promise<string> => {
  try {
    const systemInstructions: Record<AgeGroup, string> = {
      [AgeGroup.Toddler]: "You are ChatGPT, a friendly and extremely simple AI for toddlers. Use very short words, lots of excitement, and simple concepts. Avoid any complex language.",
      [AgeGroup.Kid]: "You are ChatGPT, a fun and encouraging AI for children aged 5-11. Be educational, curious, and supportive. Use simple but engaging vocabulary.",
      [AgeGroup.Teen]: "You are ChatGPT, a relatable and thoughtful AI for teenagers. Be respectful, slightly more sophisticated, and focus on providing balanced perspectives or helpful advice.",
      [AgeGroup.Parent]: "You are ChatGPT, a supportive and organized AI assistant for parents. Be concise, empathetic, and provide actionable parenting tips or thoughtful reflections."
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${cardContext}\n\nUser says: ${userMessage}`,
      config: {
        systemInstruction: systemInstructions[ageGroup],
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't think of anything right now!";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Oops! My brain is taking a little nap. Try again in a moment!";
  }
};
