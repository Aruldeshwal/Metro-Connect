import { geminiModel } from "./gemini";
import { groq } from "./groq";

export async function generateWithFallback(prompt: string) {
  try {
    // Try Gemini First
    console.log("Attempting to generate with Gemini...");
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();
    return text;
  } catch (error: any) {
    console.warn("Gemini failed, falling back to Groq:", error.message);
    
    // Fallback to Groq
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
      });
      return chatCompletion.choices[0]?.message?.content || "";
    } catch (groqError: any) {
      console.error("Groq also failed:", groqError.message);
      throw new Error("Both Gemini and Groq failed to generate content.");
    }
  }
}
