import Link from "next/link";

const conditions = [
  {
    name: "Clubfoot",
    description: "Congenital foot deformity affecting gait and mobility",
    icon: "🦶",
    slug: "clubfoot",
    color: "from-rose-400 to-pink-500",
    cases: "1 in 1,000 births",
  },
  {
    name: "Scoliosis",
    description:
      "Abnormal spinal curvature requiring evaluation and management",
    icon: "🧬",
    slug: "scoliosis",
    color: "from-orange-400 to-amber-500",
    cases: "2-3% of population",
  },
  {
    name: "Hip Dysplasia",
    description: "Developmental hip joint abnormality in infants and children",
    icon: "🦴",
    slug: "hip-dysplasia",
    color: "from-cyan-400 to-blue-500",
    cases: "1 in 1,000 births",
  },
  {
    name: "Fractures",
    description: "Bone breaks requiring proper reduction and immobilization",
    icon: "⚕️",
    slug: "fractures",
    color: "from-purple-400 to-indigo-500",
    cases: "25% of childhood injuries",
  },
];

export default function ConditionsPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-teal-100 text-teal-700 text-xs font-bold tracking-widest rounded-full border border-teal-200">
              COMPREHENSIVE GUIDES
            </span>
          </div>

          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Popular Conditions
              </h2>
              <p className="text-gray-600 max-w-md">
                Explore detailed information on commonly treated pediatric
                orthopedic conditions
              </p>
            </div>

            <Link
              href="/conditions"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 text-teal-600 font-semibold border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors whitespace-nowrap"
            >
              View All Conditions
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

        {/* Conditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {conditions.map((condition, index) => (
            <Link
              key={index}
              href={`/conditions/${condition.slug}`}
              className="group block"
            >
              <div className="h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col">
                {/* Image/Visual Section */}
                <div
                  className={`bg-gradient-to-br ${condition.color} relative h-40 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                >
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-white rounded-full -mr-14 -mt-14" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full -ml-10 -mb-10" />
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 text-6xl drop-shadow-lg">
                    {condition.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-2">
                    {condition.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                    {condition.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="mb-4 inline-block">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      {condition.cases}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-teal-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                    <span>Learn More</span>
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
                  className={`h-1 bg-gradient-to-r ${condition.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden text-center">
          <Link
            href="/conditions"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-teal-600 to-blue-600 font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            View All Conditions
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

        {/* Information CTA */}
        <div className="mt-16 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Need Help Finding Information?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Our comprehensive condition guides provide detailed information on
            diagnosis, treatment options, and clinical resources for pediatric
            orthopedic conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/conditions"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Browse All Conditions
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
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
              Search Conditions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
