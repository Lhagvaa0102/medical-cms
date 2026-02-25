import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

// Fake article data (дараа нь MongoDB холбоно)
const articlesData: Record<string, any> = {
  "pediatric-bone-health": {
    title: "JPOSNA® Releases Special Issue on Pediatric Bone Health",
    subtitle:
      "This issue features a collection of articles completely dedicated to pediatric bone health for the orthopaedic surgeon.",
    date: "2026-02-20",
    category: "Research",
    author: "Barbara Minkowitz, MD, and Christopher Iobst, MD",
    body: `We are very excited to share this special issue of JPOSNA® with you on Pediatric Bone Health. To our knowledge, this represents the first collection of articles completely dedicated to pediatric bone health for the orthopaedic surgeon.

Because of the volume of available material in the literature on bone health, it is difficult for the orthopaedic surgeon to find the time to stay up to date on the current information.

The authors of the articles in this special issue have filtered through the literature to present the key elements to the reader in a fashion that is easy to absorb and digest. This comprehensive reference will provide pediatric orthopaedic surgeons with an opportunity to enhance their knowledge and share this knowledge with patients.`,
  },
};

export default function NewsDetail({ params }: Props) {
  const article =
    articlesData[params.slug] || articlesData["pediatric-bone-health"];

  const relatedArticles = [
    {
      id: 2,
      title: "International Pediatric Conference Announced",
      date: "2026-02-10",
      category: "Events",
      slug: "international-conference",
    },
    {
      id: 3,
      title: "New Guidelines for Pediatric Fracture Management",
      date: "2026-01-28",
      category: "Guidelines",
      slug: "fracture-guidelines",
    },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Link href="/" className="hover:text-teal-600 transition">
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              />
            </svg>
            <Link href="/news" className="hover:text-teal-600 transition">
              News
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              />
            </svg>
            <span className="text-gray-900 font-medium truncate">
              {article.title.substring(0, 50)}...
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30 mb-6">
            {article.category}
          </div>

          {/* Main Title */}
          <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-teal-50 leading-relaxed mb-8 max-w-2xl">
            {article.subtitle}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-teal-100 text-sm">
            <div className="flex items-center gap-2">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            {article.author && (
              <div className="flex items-center gap-2">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{article.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-lg max-w-none">
          <div className="space-y-6 text-gray-700 leading-8">
            {article.body
              .split("\n\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="text-lg">
                  {paragraph.trim()}
                </p>
              ))}
          </div>
        </article>

        {/* Divider */}
        <div className="my-16 border-t border-gray-200" />

        {/* Author Bio Section */}
        {article.author && (
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {article.author}
                </h3>
                <p className="text-gray-600 text-sm">
                  Guest Editor, JPOSNA®. Dedicated to advancing pediatric
                  orthopedic care and education.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group block"
              >
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 bg-white hover:border-teal-300 h-full">
                  <div className="flex items-start justify-between mb-3 gap-3">
                    <time className="text-xs font-medium text-gray-500">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="inline-block px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-200 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-2 line-clamp-3">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-teal-600 font-medium text-sm group-hover:gap-2 gap-1 transition-all mt-4">
                    <span>Read more</span>
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
              </Link>
            ))}
          </div>
        </div>

        {/* Back to News CTA */}
        <div className="text-center py-8 border-t border-gray-200">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to news
          </Link>
        </div>
      </div>
    </div>
  );
}
