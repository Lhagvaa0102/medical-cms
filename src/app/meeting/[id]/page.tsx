import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Meeting } from "@/models/MeetingFull";
import MeetingProgram from "@/components/meetings/MeetingProgram";

type Props = { params: Promise<{ id: string }> };

async function getMeeting(id: string) {
  try {
    await connectDB();
    return await Meeting.findById(id).lean();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const meeting = await getMeeting(id);
  if (!meeting) return { title: "Олдсонгүй | POSM" };
  return {
    title: `${meeting.title} | POSM`,
    description: meeting.description,
  };
}

export default async function MeetingDetailPage({ params }: Props) {
  const { id } = await params;
  const meeting = await getMeeting(id);
  if (!meeting) notFound();

  return (
    <MeetingProgram
      id={String(meeting._id)}
      title={meeting.title}
      date={meeting.date}
      endDate={meeting.endDate}
      location={meeting.location}
      organizer={meeting.organizer}
      description={meeting.description}
      attendees={meeting.attendees}
      sessions={meeting.sessions}
      pptUrl={meeting.pptUrl}
    />
  );
}
