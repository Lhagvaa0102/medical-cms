import { Schema, model, models } from "mongoose";

export interface ISession {
  time: string;
  speaker: string;
  organization: string;
  topic: string;
  duration: string;
  isBreak?: boolean;
  pptUrl?: string; // илтгэл бүрийн PPT/PDF холбоос
}

export interface IMeeting {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  organizer: string;
  description: string;
  tags: string[];
  status: "upcoming" | "ongoing" | "finished";
  attendees?: number;
  presentations?: number;
  sessions: ISession[];
  pptUrl?: string; // PPT/PDF хөтөлбөрийн файл
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    time: { type: String, required: true },
    speaker: { type: String, required: true },
    organization: { type: String, default: "" },
    topic: { type: String, default: "" },
    duration: { type: String, default: "" },
    isBreak: { type: Boolean, default: false },
    pptUrl: { type: String, default: "" },
  },
  { _id: false },
);

const MeetingSchema = new Schema<IMeeting>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    endDate: { type: String },
    location: { type: String, required: true },
    organizer: { type: String, default: "POSM" },
    description: { type: String, default: "" },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "finished"],
      default: "upcoming",
    },
    attendees: { type: Number },
    presentations: { type: Number },
    sessions: [SessionSchema],
    pptUrl: { type: String },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Meeting =
  models.Meeting || model<IMeeting>("Meeting", MeetingSchema);
