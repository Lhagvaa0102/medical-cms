import Link from "next/link";

const cards = [
  {
    title: "Conditions",
    description: "Comprehensive guides to pediatric orthopedic conditions",
    icon: "🏥",
    href: "/conditions",
    color: "from-teal-500 to-cyan-500",
  },
  {
    title: "Education",
    description: "Clinical resources and professional development",
    icon: "📚",
    href: "/education",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Research",
    description: "Latest studies and evidence-based findings",
    icon: "🔬",
    href: "/research",
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Members",
    description: "Exclusive content and member benefits",
    icon: "👥",
    href: "/members",
    color: "from-teal-500 to-blue-500",
  },
];

export default function QuickCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-teal-100 text-teal-700 text-xs font-bold tracking-widest rounded-full border border-teal-200">
              EXPLORE RESOURCES
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Quick Access to Key Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Navigate directly to the content you need with our organized
            resource categories
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Link key={index} href={card.href} className="group block">
              <div className="h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-teal-300 transition-all duration-300 flex flex-col">
                {/* Icon Section */}
                <div
                  className={`bg-gradient-to-br ${card.color} relative h-32 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                >
                  {/* Decorative background */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -mr-12 -mt-12" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full -ml-10 -mb-10" />
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 text-5xl drop-shadow-md">
                    {card.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-2">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed flex-grow mb-4">
                    {card.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-teal-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                    <span>Explore</span>
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

                {/* Bottom accent bar */}
                <div
                  className={`h-1 bg-gradient-to-r ${card.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 mb-4">Looking for something specific?</p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Use Advanced Search
          </Link>
        </div>
      </div>
    </section>
  );
}
