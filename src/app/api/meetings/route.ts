import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Meeting } from "@/models/MeetingFull";

// GET /api/meetings
export async function GET() {
  try {
    await connectDB();
    const meetings = await Meeting.find({ published: true })
      .sort({ date: -1 })
      .select("-sessions")
      .lean();
    return NextResponse.json(meetings);
  } catch (err) {
    console.error("[MEETINGS GET]", err);
    return NextResponse.json(
      { error: "Татахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}

// POST /api/meetings
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      title,
      date,
      endDate,
      location,
      organizer,
      description,
      tags,
      status,
      attendees,
      presentations,
      published,
    } = body;

    if (!title || !date || !location) {
      return NextResponse.json(
        { error: "Гарчиг, огноо, байршил шаардлагатай" },
        { status: 400 },
      );
    }

    const meeting = await Meeting.create({
      title,
      date,
      endDate,
      location,
      organizer: organizer || "POSM",
      description,
      tags: tags || [],
      status: status || "upcoming",
      attendees,
      presentations,
      sessions: [],
      published: published || false,
    });

    return NextResponse.json(meeting, { status: 201 });
  } catch (err) {
    console.error("[MEETINGS POST]", err);
    return NextResponse.json(
      { error: "Нэмэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
