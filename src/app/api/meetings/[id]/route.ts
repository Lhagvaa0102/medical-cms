import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Meeting } from "@/models/MeetingFull";

type Params = { params: Promise<{ id: string }> };

// GET /api/meetings/[id]  — sessions + pptUrl бүгдийг буцаана
export async function GET(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const meeting = await Meeting.findById(id).lean();
    if (!meeting)
      return NextResponse.json({ error: "Олдсонгүй" }, { status: 404 });
    return NextResponse.json(meeting);
  } catch (err) {
    console.error("[MEETING GET ID]", err);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}

// PUT /api/meetings/[id]  — ерөнхий мэдээлэл засах
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const updated = await Meeting.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated)
      return NextResponse.json({ error: "Олдсонгүй" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[MEETING PUT]", err);
    return NextResponse.json(
      { error: "Засахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}

// DELETE /api/meetings/[id]
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    await Meeting.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[MEETING DELETE]", err);
    return NextResponse.json(
      { error: "Устгахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}

// PATCH /api/meetings/[id]  — sessions эсвэл pptUrl шинэчлэх
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // { sessions: [...] } эсвэл { pptUrl: "..." } хэлбэрээр ирнэ
    const update: Record<string, unknown> = {};
    if (body.sessions !== undefined) update.sessions = body.sessions;
    if (body.pptUrl !== undefined) update.pptUrl = body.pptUrl;

    const updated = await Meeting.findByIdAndUpdate(id, update, {
      new: true,
    }).lean();
    if (!updated)
      return NextResponse.json({ error: "Олдсонгүй" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[MEETING PATCH]", err);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
