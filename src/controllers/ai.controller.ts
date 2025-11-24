import { Request, Response } from "express";
import axios from "axios";

/**
 * NOTE:
 * Replace the endpoint + request body below with the actual Gemini/OpenAI endpoint & payload you use.
 * Example: Google AI Studio / Gemini usage may require different URL and request shape.
 */

export const analyzeExpenses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { prompt, context } = req.body;

    if (!prompt) return res.status(400).json({ message: "Prompt required" });

    // Combined prompt (you can craft prompt server-side using user's expense data)
    const finalPrompt = `UserID: ${userId}\nContext: ${context || ""}\nPrompt: ${prompt}`;

    // >>> REPLACE with actual Gemini/OpenAI REST endpoint & payload
    const response = await axios.post(
      "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini:generateText", // placeholder
      { input: finalPrompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // The shape of response.data depends on the API — adapt as need
    return res.json({ result: response.data });
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ message: "AI analyze failed" });
  }
};
