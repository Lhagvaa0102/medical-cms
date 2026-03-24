import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { News } from "@/models/News";

type Props = { params: Promise<{ id: string }> };

const categoryColor: Record<string, string> = {
  Хурал: "bg-blue-50 text-blue-600",
  Сургалт: "bg-teal-50 text-teal-600",
  Судалгаа: "bg-purple-50 text-purple-600",
  "Олон улс": "bg-amber-50 text-amber-600",
  Нийгмийн: "bg-green-50 text-green-600",
  Бусад: "bg-gray-100 text-gray-500",
};

async function getNews(id: string) {
  try {
    await connectDB();
    return await News.findById(id).lean();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const activity = await getNews(id);
  if (!activity) return { title: "Олдсонгүй | POSM" };
  return {
    title: `${activity.title} | POSM`,
    description: activity.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const activity = await getNews(id);
  if (!activity) notFound();

  return (
    <main className="bg-[#f8fafb] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-teal-500 transition-colors">
            Нүүр
          </Link>
          <span>/</span>
          <Link href="/news" className="hover:text-teal-500 transition-colors">
            Мэдээ
          </Link>
          <span>/</span>
          <span className="text-slate-600 truncate max-w-sm">
            {activity.title}
          </span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              categoryColor[activity.category] ?? categoryColor["Бусад"]
            }`}
          >
            {activity.category}
          </span>
          {activity.highlight && (
            <span className="text-xs text-teal-500 font-semibold bg-teal-50 px-3 py-1 rounded-full">
              ★ Онцлох
            </span>
          )}
          <span className="text-xs text-slate-400">{activity.date}</span>
          {activity.location && (
            <span className="text-xs text-slate-400">
              📍 {activity.location}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-5"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {activity.title}
        </h1>

        {/* Cover image */}
        {activity.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        <p className="text-base text-slate-500 leading-relaxed mb-8 border-l-4 border-teal-400 pl-5 italic">
          {activity.excerpt}
        </p>

        {/* Tags */}
        {activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {activity.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="h-px bg-gray-200 mb-10" />

        {/* Content */}
        <div className="space-y-4">
          {activity.content.split("\n").map((line: string, i: number) =>
            line.trim() === "" ? (
              <div key={i} className="h-2" />
            ) : line.startsWith("-") ? (
              <div
                key={i}
                className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed"
              >
                <span className="text-teal-400 mt-0.5 shrink-0">•</span>
                <span>{line.replace(/^-\s*/, "")}</span>
              </div>
            ) : (
              <p key={i} className="text-slate-600 leading-relaxed text-sm">
                {line}
              </p>
            ),
          )}
        </div>

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors"
          >
            ← Мэдээ руу буцах
          </Link>
        </div>
      </article>
    </main>
  );
}
