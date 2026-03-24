import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const db = mongoose.connection.db!;

    const { id } = await params; // ← await хийх шаардлагатай

    const { status } = await req.json();
    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Буруу статус" }, { status: 400 });
    }

    const result = await db
      .collection("members")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } },
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Олдсонгүй" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: "Серверт алдаа гарлаа" },
      { status: 500 },
    );
  }
}
