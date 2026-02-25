import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-white" />

      {/* Decorative blurred shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />

      <div className="relative max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            {/* Overline */}
            <div className="inline-block">
              <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 text-xs font-bold tracking-widest rounded-full border border-teal-200">
                ADVANCING PEDIATRIC CARE
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
                Pediatric Orthopedic
                <span className="block">
                  <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    Knowledge Hub
                  </span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed max-w-md">
              Access comprehensive clinical education, cutting-edge research,
              and detailed condition information from the leading pediatric
              orthopedic society.
            </p>

            {/* Features List */}
            <div className="space-y-3 pt-4">
              {[
                { icon: "📚", text: "Clinical Education & Resources" },
                { icon: "🔬", text: "Evidence-Based Research" },
                { icon: "🏥", text: "Comprehensive Condition Guides" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-gray-700 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/conditions"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Explore Conditions
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
              <Link
                href="/education"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-teal-600 text-teal-600 font-bold rounded-lg hover:bg-teal-50 transition-colors"
              >
                View Education
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
                    d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5"
                  />
                </svg>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                Trusted by pediatric orthopedic professionals
              </p>
              <div className="flex items-center gap-4">
                {[
                  { text: "5,000+", label: "Members" },
                  { text: "250+", label: "Resources" },
                  { text: "50+", label: "Countries" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-xl font-bold text-teal-600">
                      {stat.text}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 lg:h-full min-h-[500px] z-10">
            {/* Main Card */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500 via-blue-500 to-cyan-500 shadow-2xl overflow-hidden">
              {/* Card Content */}
              <div className="h-full flex flex-col items-center justify-center p-8 text-white relative">
                {/* Icon Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

                {/* Central Icon */}
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <svg
                    className="w-24 h-24 text-white opacity-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>

                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold">Comprehensive Care</h3>
                    <p className="text-sm text-white/90 max-w-xs leading-relaxed">
                      From diagnosis to treatment, access evidence-based
                      information for optimal patient outcomes.
                    </p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center text-3xl">
                  📖
                </div>
                <div className="absolute bottom-6 left-6 w-20 h-20 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center text-3xl">
                  🔬
                </div>
              </div>
            </div>

            {/* Decorative Floating Card */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-xl shadow-lg p-4 border border-gray-100 transform hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="text-3xl mb-2">🏥</div>
                <p className="text-sm font-bold text-gray-900">
                  Clinical Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative mt-20 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-700 mb-4">
            New to POSNA? Join thousands of pediatric orthopedic professionals
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition"
          >
            Become a Member
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
