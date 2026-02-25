import Link from "next/link";

const fakeNews = [
  {
    id: 1,
    title: "Pediatric Orthopedic Research Advances in 2026",
    date: "2026-02-20",
    category: "Research",
    summary:
      "New clinical studies show improved outcomes in early scoliosis treatment using minimally invasive techniques.",
  },
  {
    id: 2,
    title: "International Pediatric Conference Announced",
    date: "2026-02-10",
    category: "Events",
    summary:
      "Global specialists will gather to discuss innovations in pediatric musculoskeletal care.",
  },
  {
    id: 3,
    title: "New Guidelines for Pediatric Fracture Management",
    date: "2026-01-28",
    category: "Guidelines",
    summary:
      "Updated recommendations aim to improve recovery and reduce complications in children.",
  },
];

export default function NewsPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-teal-100 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>News & Updates</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">News</h1>
          <p className="text-teal-100 mt-3 text-lg">
            Stay informed with the latest developments in pediatric orthopedic
            care
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {fakeNews.map((news, index) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="group block"
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white hover:border-teal-300">
                <div className="p-8">
                  {/* Top row: Date and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <time className="text-sm font-medium text-gray-500">
                      {new Date(news.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                      {news.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-3 line-clamp-2">
                    {news.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {news.summary}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-teal-600 font-semibold group-hover:gap-2 gap-1 transition-all">
                    <span>Read full article</span>
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
                </div>

                {/* Bottom accent bar */}
                <div className="h-1 bg-gradient-to-r from-teal-400 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Section Divider */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            Looking for older articles?{" "}
            <Link
              href="/news/archive"
              className="text-teal-600 font-semibold hover:text-teal-700"
            >
              View archive
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
