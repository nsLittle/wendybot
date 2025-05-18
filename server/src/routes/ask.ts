import express, { Request, Response } from "express";
import OpenAI from "openai";
import { wendy } from "../data/wendy/wendy";
import { constraints } from "../data/wendy/constraints";
import { strategy } from "../data/wendy/strategy";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  });

  const systemPrompt = `${wendy}\n\n${constraints}\n\n${strategy}`;

  const { question } = req.body as { question?: string };

  if (!question) {
    res.status(400).json({ error: "Question is required" });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ?? "No reply received";
    res.status(200).json({ reply });
  } catch (err: any) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "OpenAI API failed" });
  }
});

export default router;
