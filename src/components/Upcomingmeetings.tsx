"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SectionHeader, PinIcon } from "../ui/ui";

type Meeting = {
  _id: string;
  title: string;
  date: string;
  location: string;
  tags: string[];
  status: string;
};

function daysLeft(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatMonth(dateStr: string): string {
  const m = new Date(dateStr).getMonth();
  const MONTHS = [
    "1-р",
    "2-р",
    "3-р",
    "4-р",
    "5-р",
    "6-р",
    "7-р",
    "8-р",
    "9-р",
    "10-р",
    "11-р",
    "12-р",
  ];
  return MONTHS[m];
}

export default function UpcomingMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/meetings?status=upcoming&limit=4")
      .then((r) => r.json())
      .then((data) => setMeetings(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <SectionHeader
          eyebrow="Удахгүй болох"
          title="Хурал &amp; Зөвөлгөөн"
          href="/meeting"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 h-28 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (meetings.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 pt-20 pb-16">
      <SectionHeader
        eyebrow="Удахгүй болох"
        title="Хурал &amp; Зөвөлгөөн"
        href="/meeting"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {meetings.map((conf) => (
          <MeetingCard key={conf._id} conf={conf} />
        ))}
      </div>

      <div className="mt-4 sm:hidden text-center">
        <Link
          href="/meeting"
          className="text-sm text-teal-600 font-semibold hover:text-teal-800"
        >
          Бүгдийг харах →
        </Link>
      </div>
    </section>
  );
}

function MeetingCard({ conf }: { conf: Meeting }) {
  const days = daysLeft(conf.date);

  return (
    <Link
      href={`/meeting/${conf._id}`}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex"
    >
      {/* Date strip */}
      <div className="w-20 flex-shrink-0 bg-gradient-to-b from-teal-600 to-blue-700 flex flex-col items-center justify-center text-white py-6">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
          {formatMonth(conf.date)}
        </span>
        <span className="text-3xl font-extrabold leading-tight">
          {new Date(conf.date).getUTCDate()}
        </span>
        <span className="text-[10px] opacity-70 mt-1">
          {new Date(conf.date).getUTCFullYear()}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {conf.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-600 font-semibold"
            >
              {t}
            </span>
          ))}
          {days > 0 && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold ml-auto">
              {days} хоног үлдлээ
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-teal-700 transition-colors mb-2 line-clamp-2">
          {conf.title}
        </h3>
        <p className="text-xs text-gray-400 flex items-center gap-1.5">
          <PinIcon />
          {conf.location}
        </p>
      </div>

      {/* Arrow */}
      <div className="flex items-center pr-4 text-gray-300 group-hover:text-teal-500 transition-colors flex-shrink-0">
        <svg
          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
