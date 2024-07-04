import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Console } from "console";
import { data } from "autoprefixer";
console.log(process.env.OPENAI_API_KEY!);

export async function POST(req: NextRequest) {
  const anthropic = new Anthropic({
    apiKey: process.env.OPENAI_API_KEY!,
  });
  try {
    const { CustomPrompt, messages } = await req.json();
    console.log(messages);
    if (CustomPrompt) {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: CustomPrompt,
        messages: messages,
      });
      console.log(response);
      return NextResponse.json({ data: response.content[0] });
    } else {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        messages: messages,
      });
      console.log(response);
      return NextResponse.json({ data: response.content[0] });
    }
  } catch (error: any) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { message: "Error generating text", error: error.message },
      { status: 500 }
    );
  }

  // commit
}
