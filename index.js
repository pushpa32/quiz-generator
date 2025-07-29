import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(express.json());
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

app.post("/generate-quiz", async (req, res) => {
  const { content } = req.body;
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: content,
    });
    const quiz = result.text;
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
