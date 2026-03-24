import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const db = mongoose.connection.db!;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;
    const skip = (page - 1) * limit;

    const filter = status === "all" ? {} : { status };

    const [members, total] = await Promise.all([
      db
        .collection("members")
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("members").countDocuments(filter),
    ]);

    return NextResponse.json({
      members: members.map((m) => ({ ...m, _id: m._id.toString() })),
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin members GET error:", error);
    return NextResponse.json(
      { error: "Серверт алдаа гарлаа" },
      { status: 500 },
    );
  }
}
