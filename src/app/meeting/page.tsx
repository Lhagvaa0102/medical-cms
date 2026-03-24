"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type Meeting = {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  organizer: string;
  status: "upcoming" | "ongoing" | "finished";
  attendees?: number;
  presentations?: number;
  description: string;
  tags: string[];
};

const statusLabels = {
  finished: { label: "Дууссан", color: "bg-gray-100 text-gray-500" },
  upcoming: { label: "Удахгүй", color: "bg-teal-100 text-teal-700" },
  ongoing: { label: "Явагдаж байна", color: "bg-blue-100 text-blue-700" },
};

function CalendarIcon() {
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
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
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
function UserIcon() {
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
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export default function MeetingPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState("Бүгд");

  // ── Fetch from API ────────────────────────────────────────
  useEffect(() => {
    fetch("/api/meetings")
      .then((r) => r.json())
      .then((data) => setMeetings(Array.isArray(data) ? data : []))
      .catch(() => setMeetings([]))
      .finally(() => setLoading(false));
  }, []);

  // ── Derived ───────────────────────────────────────────────
  const years = [
    "Бүгд",
    ...Array.from(
      new Set(meetings.map((m) => new Date(m.date).getFullYear().toString())),
    ).sort((a, b) => +b - +a),
  ];

  const filtered = meetings.filter((m) =>
    activeYear === "Бүгд"
      ? true
      : new Date(m.date).getFullYear().toString() === activeYear,
  );

  const upcoming = meetings.filter((m) => m.status === "upcoming");

  // ── Skeleton ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafb]">
        <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-blue-700 h-52" />
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl h-52 animate-pulse border border-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-blue-700 text-white">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-teal-500/20 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-center gap-2 text-teal-200 text-xs mb-6">
            <Link href="/" className="hover:text-white transition">
              Нүүр
            </Link>
            <span>›</span>
            <span className="text-white font-medium">Хурал зөвөлгөөн</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
                Хурал &amp;
                <br />
                Зөвөлгөөн
              </h1>
              <p className="text-teal-100 text-base max-w-lg leading-relaxed">
                POSM-ын зохион байгуулдаг хурал, семинар, сургалтуудын мэдээлэл
                болон хөтөлбөртэй танилцана уу.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center border border-white/15">
                <p className="text-3xl font-bold">{meetings.length}</p>
                <p className="text-teal-200 text-xs mt-1 uppercase tracking-widest">
                  Нийт хурал
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center border border-white/15">
                <p className="text-3xl font-bold">{upcoming.length}</p>
                <p className="text-teal-200 text-xs mt-1 uppercase tracking-widest">
                  Удахгүй
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-6 bg-[#f8fafb]"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* ── Upcoming highlight ── */}
        {upcoming.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <h2 className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                Удахгүй болох хурал
              </h2>
            </div>
            {upcoming.map((conf) => (
              <div
                key={conf._id}
                className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="flex-1 relative">
                  <span className="inline-block mb-3 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                    🗓{" "}
                    {new Date(conf.date).toLocaleDateString("mn-MN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight mb-2">
                    {conf.title}
                  </h3>
                  <p className="text-teal-100 text-sm">{conf.description}</p>
                  <div className="flex flex-wrap gap-3 mt-4 text-sm text-teal-100">
                    <span className="flex items-center gap-1.5">
                      <PinIcon />
                      {conf.location}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <Link
                    href="/join"
                    className="px-6 py-2.5 bg-white text-teal-700 text-sm font-bold rounded-full hover:bg-teal-50 transition text-center"
                  >
                    Бүртгүүлэх
                  </Link>
                  <Link
                    href={`/meeting/${conf._id}`}
                    className="px-6 py-2.5 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition text-center"
                  >
                    Дэлгэрэнгүй
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Filter bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Хурлын жагсаалт</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {filtered.length} хурал олдлоо
            </p>
          </div>
          <div className="flex bg-white border border-gray-200 rounded-full p-1 gap-1">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeYear === y
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-teal-600"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* ── Cards ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="font-semibold text-gray-500">
              Энэ жилд хурал бүртгэгдээгүй байна
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((conf) => {
              const s = statusLabels[conf.status];
              const multiDay = conf.endDate && conf.endDate !== conf.date;
              return (
                <article
                  key={conf._id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div
                    className={`h-1 w-full ${conf.status === "upcoming" ? "bg-gradient-to-r from-teal-400 to-blue-500" : "bg-gradient-to-r from-gray-200 to-gray-300"}`}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex flex-col items-center justify-center leading-tight">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                          {new Date(conf.date).toLocaleDateString("mn-MN", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-lg font-extrabold">
                          {new Date(conf.date).getDate()}
                        </span>
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-teal-700 transition-colors line-clamp-2">
                          {conf.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {conf.organizer}
                        </p>
                      </div>
                      <span
                        className={`flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${s.color}`}
                      >
                        {s.label}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-4">
                      {conf.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <CalendarIcon />
                        <span>
                          {new Date(conf.date).toLocaleDateString("mn-MN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          {multiDay && (
                            <>
                              {" "}
                              —{" "}
                              {new Date(conf.endDate!).toLocaleDateString(
                                "mn-MN",
                                { month: "long", day: "numeric" },
                              )}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <PinIcon />
                        <span className="line-clamp-1">{conf.location}</span>
                      </div>
                      {conf.attendees && (
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <UserIcon />
                          <span>
                            {conf.attendees} оролцогч · {conf.presentations}{" "}
                            илтгэл
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {conf.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/meeting/${conf._id}`}
                      className="mt-auto flex items-center justify-between px-5 py-3 rounded-xl bg-gray-50 text-gray-700 text-sm font-semibold hover:bg-teal-600 hover:text-white transition-colors group/btn"
                    >
                      <span>
                        {conf.status === "upcoming"
                          ? "Бүртгэл & дэлгэрэнгүй"
                          : "Хөтөлбөр харах"}
                      </span>
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
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
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
