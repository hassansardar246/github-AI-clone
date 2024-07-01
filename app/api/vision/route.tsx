import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
console.log(process.env.OPENAI_API_KEY!);

export async function POST(req: NextRequest) {
  const anthropic = new Anthropic({
    apiKey: process.env.OPENAI_API_KEY!,
  });
  try {
    const { prompt, custom_promt } = await req.json();

    if (!prompt || !custom_promt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: custom_promt,
      messages: [{ role: "user", content: prompt }],
    });
    return NextResponse.json(response.content[0]);
  } catch (error: any) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { message: "Error generating text", error: error.message },
      { status: 500 }
    );
  }

  // commit
}
