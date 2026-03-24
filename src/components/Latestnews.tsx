"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SectionHeader, CategoryBadge } from "../ui/ui";

type NewsItem = {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl?: string;
};

function formatDate(dateStr: string): string {
  const dt = new Date(dateStr);
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
  return `${dt.getUTCFullYear()} оны ${MONTHS[dt.getUTCMonth()]}ын ${dt.getUTCDate()}`;
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news?limit=3")
      .then((r) => r.json())
      .then((data) => setNews(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionHeader
          eyebrow="Сүүлийн үеийн"
          title="Мэдээ &amp; Нийтлэл"
          href="/news"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 h-72 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <SectionHeader
        eyebrow="Сүүлийн үеийн"
        title="Мэдээ &amp; Нийтлэл"
        href="/news"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {news.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
      </div>

      <div className="mt-4 sm:hidden text-center">
        <Link
          href="/news"
          className="text-sm text-teal-600 font-semibold hover:text-teal-800"
        >
          Бүгдийг харах →
        </Link>
      </div>
    </section>
  );
}

function NewsCard({ article }: { article: NewsItem }) {
  return (
    <Link
      href={`/news/${article._id}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden flex-shrink-0">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
            📰
          </div>
        )}
        <div className="absolute top-3 left-3">
          <CategoryBadge label={article.category} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-2">{formatDate(article.date)}</p>
        <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-teal-700 transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal-600 group-hover:text-teal-800 transition-colors">
          Дэлгэрэнгүй унших
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
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
      </div>
    </Link>
  );
}
