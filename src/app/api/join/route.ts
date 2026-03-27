import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File → base64 data URI
async function toBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const lastName = (formData.get("lastName") as string)?.trim();
    const firstName = (formData.get("firstName") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const specialty = (formData.get("specialty") as string)?.trim();
    const organization = (formData.get("organization") as string)?.trim();
    const degree = (formData.get("degree") as string)?.trim();
    const experience = (formData.get("experience") as string)?.trim() || null;
    const message = (formData.get("message") as string)?.trim() || null;
    const receiptUrl = (formData.get("receiptUrl") as string)?.trim() || null;

    const photoFile = formData.get("photo") as File | null;
    const cvFile = formData.get("cv") as File | null;

    // Validation — required fields
    for (const [key, val] of Object.entries({
      lastName,
      firstName,
      phone,
      email,
      specialty,
      organization,
      degree,
    })) {
      if (!val) {
        return NextResponse.json(
          { error: `"${key}" талбар шаардлагатай` },
          { status: 400 },
        );
      }
    }

    // Гүйлгээний баримт заавал шаардлагатай
    if (!receiptUrl) {
      return NextResponse.json(
        { error: "Гүйлгээний баримтын зургийг заавал оруулна уу" },
        { status: 400 },
      );
    }

    // Upload photo → Cloudinary
    let photoCloudUrl: string | null = null;
    if (photoFile && photoFile.size > 0) {
      const base64 = await toBase64(photoFile);
      const result = await cloudinary.uploader.upload(base64, {
        folder: "posm/members/photos",
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
        ],
        resource_type: "image",
      });
      photoCloudUrl = result.secure_url;
    }

    // Upload CV → Cloudinary
    let cvUrl: string | null = null;
    if (cvFile && cvFile.size > 0) {
      const base64 = await toBase64(cvFile);
      const result = await cloudinary.uploader.upload(base64, {
        folder: "posm/members/cvs",
        resource_type: "raw",
        public_id: `${Date.now()}-${cvFile.name}`,
      });
      cvUrl = result.secure_url;
    }

    // Save to MongoDB
    await connectDB();
    const db = mongoose.connection.db?.collection("members");

    await db?.insertOne({
      lastName,
      firstName,
      phone,
      email,
      specialty,
      organization,
      degree,
      experience,
      message,
      photoUrl: photoCloudUrl,
      cvUrl,
      receiptUrl, // Cloudinary-с ирсэн гүйлгээний баримтын URL
      status: "pending", // pending | approved | rejected
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Join API error:", error);
    return NextResponse.json(
      { error: "Серверт алдаа гарлаа, дахин оролдоно уу" },
      { status: 500 },
    );
  }
}
