"use client";
import { useState } from "react";
import Link from "next/link";

type Session = {
  time: string;
  speaker: string;
  organization: string;
  topic: string;
  duration: string;
  isBreak?: boolean;
  pptUrl?: string;
};

type Props = {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  organizer: string;
  description?: string;
  attendees?: number;
  sessions: Session[];
  pptUrl?: string; // хэрэглэхгүй болсон ч props-д хэвээр байна
};

export default function MeetingProgram({
  title,
  date,
  endDate,
  location,
  organizer,
  attendees,
  sessions,
}: Props) {
  const [search, setSearch] = useState("");
  const [hoveredIdx, setHovered] = useState<number | null>(null);

  const sessionCount = sessions.filter((s) => !s.isBreak).length;
  const pptCount = sessions.filter((s) => !s.isBreak && s.pptUrl).length;

  const displayed = search
    ? sessions.filter((s) => {
        if (s.isBreak) return false;
        const q = search.toLowerCase();
        return (
          s.speaker.toLowerCase().includes(q) ||
          s.topic.toLowerCase().includes(q) ||
          s.organization.toLowerCase().includes(q)
        );
      })
    : sessions;

  const MONTHS = [
    "1-р сар",
    "2-р сар",
    "3-р сар",
    "4-р сар",
    "5-р сар",
    "6-р сар",
    "7-р сар",
    "8-р сар",
    "9-р сар",
    "10-р сар",
    "11-р сар",
    "12-р сар",
  ];
  const formatDate = (d: string) => {
    const dt = new Date(d);
    return `${dt.getUTCFullYear()} оны ${MONTHS[dt.getUTCMonth()]}ын ${dt.getUTCDate()}`;
  };

  let rowIdx = 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-teal-200 text-xs mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Нүүр
            </Link>
            <span>›</span>
            <Link
              href="/meeting"
              className="hover:text-white transition-colors"
            >
              Хурал зөвөлгөөн
            </Link>
            <span>›</span>
            <span className="text-white font-medium line-clamp-1">{title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                {organizer} · Эрдэм шинжилгээний хурал
              </div>

              <h1
                className="text-3xl md:text-4xl font-extrabold leading-tight mb-4"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-teal-100">
                <span className="flex items-center gap-1.5">
                  <CalIcon />
                  {formatDate(date)}
                  {endDate && endDate !== date && ` — ${formatDate(endDate)}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <PinIcon />
                  {location}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3 shrink-0">
              {[
                { value: sessionCount, label: "Илтгэл" },
                ...(attendees ? [{ value: attendees, label: "Оролцогч" }] : []),
                ...(pptCount > 0 ? [{ value: pptCount, label: "PPT" }] : []),
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-4 text-center min-w-[72px]"
                >
                  <p className="text-2xl font-extrabold">{s.value}</p>
                  <p className="text-teal-200 text-[11px] mt-0.5 uppercase tracking-widest">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-8 max-w-sm">
            <SearchIcon />
            <input
              type="text"
              placeholder="Илтгэгч, сэдэв хайх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/15 border border-white/25 text-white placeholder-teal-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:bg-white/25 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── Program table ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-6 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Table header */}
          <div className="grid grid-cols-[3rem_5rem_1fr_1.4fr_1.2fr_5rem_4rem] bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider">
            <div className="px-4 py-3.5 text-center">#</div>
            <div className="px-4 py-3.5">Цаг</div>
            <div className="px-4 py-3.5">Илтгэгч</div>
            <div className="px-4 py-3.5">Байгууллага</div>
            <div className="px-4 py-3.5">Сэдэв</div>
            <div className="px-4 py-3.5 text-right">Үргэлжлэх</div>
            <div className="px-4 py-3.5 text-center">PPT</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {displayed.length === 0 && search && (
              <div className="py-16 text-center text-slate-400 text-sm">
                "{search}" илтгэл олдсонгүй
              </div>
            )}
            {sessions.length === 0 && !search && (
              <div className="py-16 text-center text-slate-400 text-sm">
                Хөтөлбөр оруулаагүй байна
              </div>
            )}

            {displayed.map((session, i) => {
              // ── Break row ──
              if (session.isBreak) {
                return (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100"
                  >
                    <div className="flex items-center gap-3 px-6 py-3">
                      <span className="text-amber-500">☕</span>
                      <span className="font-semibold text-amber-800 text-sm">
                        {session.speaker}
                      </span>
                      <span className="text-amber-400 text-xs ml-1">
                        {session.time}
                      </span>
                    </div>
                  </div>
                );
              }

              // ── Session row ──
              rowIdx++;
              const num = rowIdx;
              const isHov = hoveredIdx === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`grid grid-cols-[3rem_5rem_1fr_1.4fr_1.2fr_5rem_4rem] transition-colors duration-100 ${
                    isHov
                      ? "bg-teal-50"
                      : num % 2 === 0
                        ? "bg-slate-50/50"
                        : "bg-white"
                  }`}
                >
                  {/* # */}
                  <div className="px-4 py-4 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-300">
                      {num}
                    </span>
                  </div>

                  {/* Цаг */}
                  <div className="px-4 py-4 flex items-center">
                    <span
                      className={`text-sm font-bold tabular-nums ${isHov ? "text-teal-600" : "text-slate-700"}`}
                    >
                      {session.time}
                    </span>
                  </div>

                  {/* Илтгэгч */}
                  <div className="px-4 py-4 flex items-center">
                    <p
                      className={`text-sm font-semibold ${isHov ? "text-teal-800" : "text-slate-800"}`}
                    >
                      {session.speaker}
                    </p>
                  </div>

                  {/* Байгууллага */}
                  <div className="px-4 py-4 flex items-center">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {session.organization}
                    </p>
                  </div>

                  {/* Сэдэв */}
                  <div className="px-4 py-4 flex items-center">
                    <p
                      className={`text-sm leading-snug ${isHov ? "text-teal-700 font-medium" : "text-slate-700"}`}
                    >
                      {session.topic}
                    </p>
                  </div>

                  {/* Үргэлжлэх */}
                  <div className="px-4 py-4 flex items-center justify-end">
                    {session.duration && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2.5 py-1 whitespace-nowrap">
                        <ClockIcon />
                        {session.duration}
                      </span>
                    )}
                  </div>

                  {/* PPT — илтгэл бүрийн татах товч */}
                  <div className="px-4 py-4 flex items-center justify-center">
                    {session.pptUrl ? (
                      <a
                        href={session.pptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="PPT татах"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-500 hover:text-white transition-colors"
                      >
                        <PptIcon />
                      </a>
                    ) : (
                      <span className="text-slate-200 text-xs">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Нийт <strong className="text-slate-600">{sessionCount}</strong>{" "}
              илтгэл
              {pptCount > 0 && (
                <span className="ml-2 text-teal-500">
                  · {pptCount} PPT татах боломжтой
                </span>
              )}
            </span>
            <Link
              href="/meeting"
              className="text-xs text-slate-400 hover:text-teal-500 transition-colors"
            >
              ← Хурлуудад буцах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────
function CalIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg
      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
      />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
    </svg>
  );
}
function PptIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
