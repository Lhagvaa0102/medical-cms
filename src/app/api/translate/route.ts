import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import {
  TranslateRequest,
  TranslateResponse,
  TranslateError,
  LANGUAGE_NAMES,
  SupportedLanguage,
} from "@/types/translation";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_NAMES) as SupportedLanguage[];

export async function POST(
  request: NextRequest,
): Promise<NextResponse<TranslateResponse | TranslateError>> {
  try {
    const body: TranslateRequest = await request.json();
    const { text, targetLang = "mn" } = body;

    if (!text?.trim()) {
      return NextResponse.json(
        { error: "Орчуулах текст хоосон байна" },
        { status: 400 },
      );
    }

    if (!SUPPORTED_LANGUAGES.includes(targetLang)) {
      return NextResponse.json(
        { error: `Дэмжигдээгүй хэл: ${targetLang}` },
        { status: 400 },
      );
    }

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Дараах текстийг ${LANGUAGE_NAMES[targetLang]} хэл рүү орчуул.
Зөвхөн орчуулсан текстийг л буцаа, тайлбар болон нэмэлт текст хэрэггүй.

Орчуулах текст:
${text}`,
        },
      ],
    });

    const translated =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ translated });
  } catch (err) {
    console.error("Translation error:", err);
    return NextResponse.json(
      { error: "Орчуулга амжилтгүй боллоо" },
      { status: 500 },
    );
  }
}
