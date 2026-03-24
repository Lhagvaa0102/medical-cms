import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const db = mongoose.connection.db!;

    const { id } = await params; // ← await

    const member = await db
      .collection("members")
      .findOne({ _id: new ObjectId(id) });

    if (!member) {
      return NextResponse.json({ error: "Гишүүн олдсонгүй" }, { status: 404 });
    }

    const { subject, body } = await req.json();
    if (!subject || !body) {
      return NextResponse.json(
        { error: "Гарчиг болон агуулга шаардлагатай" },
        { status: 400 },
      );
    }

    await transporter.sendMail({
      from: `"POSM" <${process.env.SMTP_USER}>`,
      to: member.email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f766e, #0891b2); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">POSM</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Монголын Хүүхдийн Ортопед Травматологийн Нийгэмлэг</p>
          </div>
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #334155; font-size: 16px; margin: 0 0 16px;">
              Эрхэм <strong>${member.lastName} ${member.firstName}</strong>,
            </p>
            <div style="color: #475569; font-size: 15px; line-height: 1.7; white-space: pre-line;">${body}</div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">
              POSM Захиргаа<br/>
              posm@posm.mn
            </p>
          </div>
        </div>
      `,
    });

    await db.collection("members").updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          emailLog: { subject, sentAt: new Date() },
        } as any,
      },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "И-мэйл илгээхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
