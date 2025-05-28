import { GoogleGenerativeAI } from "@google/generative-ai";
import { model, systemInstruction } from "../src/scripts/constants";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const { message, history } = req.body;
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const chat = ai
      .getGenerativeModel({
        model: model,
        config: { systemInstruction: systemInstruction },
      })
      .startChat({
        history: history || [],
      });
    const result = await chat.sendMessage(message);
    const response = await result.response.text();

    res.status(200).json({ text: response });
  } catch (err) {
    console.error("Error from Gemini API:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
