import { Schema, model, models } from "mongoose";

export interface INews {
  _id: string;
  title: string;
  category:
    | "Хурал"
    | "Сургалт"
    | "Судалгаа"
    | "Олон улс"
    | "Нийгмийн"
    | "Бусад";
  year: string;
  date: string;
  location?: string;
  tags: string[];
  excerpt: string;
  content: string;
  highlight: boolean;
  published: boolean;
  imageUrl?: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Хурал", "Сургалт", "Судалгаа", "Олон улс", "Нийгмийн", "Бусад"],
      default: "Бусад",
    },
    year: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, default: "" },
    tags: [{ type: String }],
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    highlight: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    imageUrl: { type: String, default: "" },
    images: [{ type: String }],
  },
  { timestamps: true },
);

export const News = models.News || model<INews>("News", NewsSchema);
