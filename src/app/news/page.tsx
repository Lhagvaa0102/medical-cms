"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type News = {
  _id: string;
  title: string;
  category: string;
  year: string;
  date: string;
  location?: string;
  tags: string[];
  excerpt: string;
  highlight: boolean;
};

const CATEGORIES = [
  "Бүгд",
  "Хурал",
  "Сургалт",
  "Судалгаа",
  "Олон улс",
  "Нийгмийн",
];

const categoryColor: Record<string, string> = {
  Хурал: "bg-blue-50 text-blue-600",
  Сургалт: "bg-teal-50 text-teal-600",
  Судалгаа: "bg-purple-50 text-purple-600",
  "Олон улс": "bg-amber-50 text-amber-600",
  Нийгмийн: "bg-green-50 text-green-600",
  Бусад: "bg-gray-100 text-gray-500",
};

export default function InformationPage() {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Бүгд");

  useEffect(() => {
    setLoading(true);
    const params =
      activeTab !== "Бүгд" ? `?category=${encodeURIComponent(activeTab)}` : "";
    fetch(`/api/news${params}`)
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeTab]);

  const years = [...new Set(items.map((a) => a.year))].sort((a, b) => +b - +a);

  return (
    <main className="bg-[#f8fafb] min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-teal-400" />
            <span className="text-teal-500 text-xs font-bold uppercase tracking-widest">
              POSM
            </span>
          </div>
          <h1
            className="text-3xl font-extrabold text-slate-800"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Мэдээ
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Хурал, сургалт, судалгаа болон нийгмийн ажлын мэдээлэл
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  activeTab === cat
                    ? "bg-teal-500 text-white border-teal-500 shadow-sm"
                    : "bg-white text-slate-500 border-gray-200 hover:border-teal-300 hover:text-teal-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 h-52 animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">Мэдээлэл байхгүй байна</p>
          </div>
        ) : (
          years.map((year) => (
            <div key={year} className="mb-14">
              <div className="flex items-center gap-4 mb-7">
                <span className="text-5xl font-extrabold text-slate-100 leading-none select-none">
                  {year}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-slate-300 font-medium">
                  {items.filter((a) => a.year === year).length} үйл ажиллагаа
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items
                  .filter((a) => a.year === year)
                  .map((act) => (
                    <Link
                      key={act._id}
                      href={`/news/${act._id}`}
                      className={`group bg-white rounded-2xl border shadow-sm overflow-hidden
                      hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col
                      ${act.highlight ? "border-teal-200 ring-1 ring-teal-100" : "border-gray-100"}`}
                    >
                      {(act as any).imageUrl ? (
                        <div className="h-36 overflow-hidden">
                          <img
                            src={(act as any).imageUrl}
                            alt={act.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div
                          className={`h-1 w-full transition-all duration-300 ${
                            act.highlight
                              ? "bg-gradient-to-r from-teal-400 to-teal-500"
                              : "bg-slate-100 group-hover:bg-teal-200"
                          }`}
                        />
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[act.category] ?? categoryColor["Бусад"]}`}
                          >
                            {act.category}
                          </span>
                          {act.highlight && (
                            <span className="text-xs text-teal-500 font-semibold">
                              ★
                            </span>
                          )}
                        </div>
                        <h2 className="text-sm font-bold text-slate-800 leading-snug mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                          {act.title}
                        </h2>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1">
                          {act.excerpt}
                        </p>
                        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs text-slate-300 min-w-0">
                            <span className="shrink-0">{act.date}</span>
                            {act.location && (
                              <>
                                <span>·</span>
                                <span className="truncate">
                                  📍 {act.location}
                                </span>
                              </>
                            )}
                          </div>
                          <span className="text-xs text-teal-500 font-semibold group-hover:underline whitespace-nowrap shrink-0">
                            Дэлгэрэнгүй →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
