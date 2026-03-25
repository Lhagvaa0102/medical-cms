"use client";
import { useState } from "react";
import { tips } from "@/data";

const ALL_CATEGORIES = [
  "Бүгд",
  ...Array.from(new Set(tips.map((t) => t.category))),
];

const colorMap: Record<
  string,
  { badge: string; btn: string; border: string; icon: string }
> = {
  teal: {
    badge: "bg-teal-100 text-teal-700",
    btn: "bg-teal-600 hover:bg-teal-700 text-white",
    border: "border-teal-200",
    icon: "bg-teal-50 text-teal-600",
  },
  cyan: {
    badge: "bg-cyan-100 text-cyan-700",
    btn: "bg-cyan-600 hover:bg-cyan-700 text-white",
    border: "border-cyan-200",
    icon: "bg-cyan-50 text-cyan-600",
  },
  sky: {
    badge: "bg-sky-100 text-sky-700",
    btn: "bg-sky-600 hover:bg-sky-700 text-white",
    border: "border-sky-200",
    icon: "bg-sky-50 text-sky-600",
  },
};

export default function EducationPage() {
  const [activeCategory, setActiveCategory] = useState("Бүгд");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeCategory === "Бүгд"
      ? tips
      : tips.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
            POSM · Мэдээлэл & Зөвлөмж
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Эрүүл мэндийн зөвлөмж
          </h1>
          <p className="text-teal-100 text-lg max-w-xl leading-relaxed">
            Хүүхдийн ортопед, травматологийн чиглэлээр мэргэжилтнүүдийн
            бэлтгэсэн эцэг эхчүүдэд зориулсан зөвлөмжүүд.
          </p>
        </div>

        {/* Category filter */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-2 flex-wrap border-b border-white/20">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap ${
                  activeCategory === cat
                    ? "border-white text-white"
                    : "border-transparent text-teal-200 hover:text-white"
                }`}
              >
                {cat}
                <span
                  className={`ml-2 text-xs rounded-full px-1.5 py-0.5 ${activeCategory === cat ? "bg-white/25" : "bg-white/10"}`}
                >
                  {cat === "Бүгд"
                    ? tips.length
                    : tips.filter((t) => t.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tip) => {
            const c = colorMap[tip.color];
            const isOpen = expandedId === tip.id;
            return (
              <div
                key={tip.id}
                id={`tip-${tip.id}`}
                className={`bg-white rounded-2xl border shadow-sm transition-all duration-300 overflow-hidden flex flex-col ${
                  isOpen
                    ? `${c.border} shadow-md`
                    : "border-slate-100 hover:shadow-md hover:-translate-y-1"
                }`}
              >
                <div className="p-5 flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${c.icon}`}
                    >
                      {tip.categoryIcon}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-1 ${c.badge}`}
                    >
                      {tip.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base leading-snug mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tip.summary}
                  </p>
                </div>

                {isOpen && (
                  <div className="px-5 pb-4">
                    <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                      {tip.content.map((line, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${c.icon}`}
                          >
                            {i + 1}
                          </span>
                          <span className="text-sm text-slate-600 leading-relaxed">
                            {line}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="px-5 pb-5">
                  <button
                    onClick={() => setExpandedId(isOpen ? null : tip.id)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isOpen
                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        : c.btn
                    }`}
                  >
                    {isOpen ? "Хураах ↑" : "Дэлгэрэнгүй үзэх →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
            ⚕️
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-1">
              Анхааруулга
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Энэхүү зөвлөмжүүд нь ерөнхий мэдээлэл бөгөөд эмчийн үзлэг,
              оношлогоог орлохгүй. Хүүхдийн эрүүл мэндтэй холбоотой аливаа
              асуудалд заавал мэргэжлийн эмчид хандана уу.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
