import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/News";

type Params = { params: Promise<{ id: string }> };

// GET /api/news/[id]
export async function GET(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const activity = await News.findById(id).lean();
    if (!activity)
      return NextResponse.json({ error: "Олдсонгүй" }, { status: 404 });
    return NextResponse.json(activity);
  } catch (err) {
    console.error("[ACTIVITY GET ID]", err);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}

// PUT /api/news/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const updated = await News.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated)
      return NextResponse.json({ error: "Олдсонгүй" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[ACTIVITY PUT]", err);
    return NextResponse.json(
      { error: "Засахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}

// DELETE /api/news/[id]
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    await News.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ACTIVITY DELETE]", err);
    return NextResponse.json(
      { error: "Устгахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
