import Link from "next/link";

const news = [
  {
    id: 1,
    title: "New Pediatric Research Published",
    excerpt:
      "Breakthrough clinical studies show promising results in minimally invasive orthopedic treatments.",
    date: "2026-02-20",
    category: "Research",
    slug: "pediatric-research-published",
    image: "🔬",
  },
  {
    id: 2,
    title: "Annual Meeting Updates",
    excerpt:
      "Join us for the latest innovations and networking opportunities with pediatric orthopedic specialists.",
    date: "2026-02-15",
    category: "Events",
    slug: "annual-meeting-updates",
    image: "📅",
  },
  {
    id: 3,
    title: "Clinical Guidelines Released",
    excerpt:
      "Updated evidence-based recommendations for pediatric fracture management and bone health.",
    date: "2026-02-10",
    category: "Guidelines",
    slug: "clinical-guidelines-released",
    image: "📋",
  },
];

export default function NewsPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-teal-100 text-teal-700 text-xs font-bold tracking-widest rounded-full border border-teal-200">
              STAY INFORMED
            </span>
          </div>

          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Latest News & Updates
              </h2>
              <p className="text-gray-600 max-w-md">
                Keep up with the latest developments in pediatric orthopedic
                care, research, and professional events.
              </p>
            </div>

            <Link
              href="/news"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 text-teal-600 font-semibold border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors whitespace-nowrap"
            >
              View All News
              <svg
                className="w-5 h-5"
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
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group block"
            >
              <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-teal-300 transition-all duration-300">
                {/* Image/Visual Section */}
                <div className="relative h-48 bg-gradient-to-br from-teal-100 via-blue-100 to-cyan-100 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-300 rounded-full -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full -ml-12 -mb-12" />
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 text-6xl drop-shadow-sm">
                    {item.image}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white text-teal-700 text-xs font-semibold rounded-full border border-teal-200 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Date */}
                  <time className="text-xs font-medium text-gray-500 mb-3">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-3 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-grow line-clamp-3">
                    {item.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-teal-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                    <span>Read Article</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-teal-400 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-teal-600 to-blue-600 font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            View All News
            <svg
              className="w-5 h-5"
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
      </div>
    </section>
  );
}
