import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  defaultHeaders: { "OpenAI-Beta": "assistants=v2" }, // Move the closing brace after this line
});
console.log(process.env.OPENAI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Who won the world series in 2020?" },
        {
          role: "assistant",
          content: "The Los Angeles Dodgers won the World Series in 2020.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(response.choices[0]);

    return NextResponse.json(response.choices[0]);
  } catch (error: any) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { message: "Error generating text", error: error.message },
      { status: 500 }
    );
  }
}
