import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/News";

// GET /api/news?category=Хурал&all=1&highlight=1&limit=4
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const all = searchParams.get("all");
    const highlight = searchParams.get("highlight");
    const limit = parseInt(searchParams.get("limit") || "100");

    const filter: Record<string, unknown> =
      all === "1" ? {} : { published: true };
    if (category && category !== "Бүгд") filter.category = category;
    if (highlight === "1") filter.highlight = true;

    const news = await News.find(filter).sort({ date: -1 }).limit(limit).lean();

    return NextResponse.json(news);
  } catch (err) {
    console.error("[NEWS GET]", err);
    return NextResponse.json(
      { error: "Татахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}

// POST /api/news
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      title,
      category,
      year,
      date,
      location,
      tags,
      excerpt,
      content,
      highlight,
      published,
      imageUrl,
    } = body;

    if (!title || !excerpt || !content || !date) {
      return NextResponse.json(
        { error: "Шаардлагатай талбарууд дутуу байна" },
        { status: 400 },
      );
    }

    const news = await News.create({
      title,
      category,
      year,
      date,
      location,
      tags: tags ?? [],
      excerpt,
      content,
      highlight: highlight ?? false,
      published: published ?? false,
      imageUrl: imageUrl ?? "",
    });

    return NextResponse.json(news, { status: 201 });
  } catch (err) {
    console.error("[NEWS POST]", err);
    return NextResponse.json(
      { error: "Нэмэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
