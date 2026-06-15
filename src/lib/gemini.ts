import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined in environment variables.");
}

export const ai = new GoogleGenerativeAI(apiKey);

export const DEFAULT_MODEL = "gemini-2.5-flash";
export default ai;
