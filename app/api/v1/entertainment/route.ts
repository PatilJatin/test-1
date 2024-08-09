import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PROMPTS } from "@/helper/prompts";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { headline } = await request.json();
  const prompt = PROMPTS.ENTERTAINMENT_STORY(headline);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const choices = response.choices?.[0];
    const story = choices?.message?.content?.trim() ?? "";

    return NextResponse.json(story, { status: 200 });
  } catch (error) {
    console.error("Error fetching entertainment story:", error);
    return NextResponse.json(
      { error: "Failed to fetch entertainment story" },
      { status: 500 }
    );
  }
}
