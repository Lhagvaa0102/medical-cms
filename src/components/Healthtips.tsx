import Link from "next/link";
import { healthTipsData } from "@/data";
import { SectionHeader } from "../ui/ui";

export default function HealthTips() {
  // Эхний 4-г харуулна
  const displayed = healthTipsData.slice(0, 4);

  return (
    <section className="bg-white border-y border-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          eyebrow="Эцэг эхчүүдэд"
          title="Зөвлөмж &amp; Мэдээлэл"
          href="/education"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayed.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>

        <div className="mt-4 sm:hidden text-center">
          <Link
            href="/education"
            className="text-sm text-teal-600 font-semibold hover:text-teal-800"
          >
            Бүгдийг харах →
          </Link>
        </div>
      </div>
    </section>
  );
}

type TipCardProps = ReturnType<
  typeof import("@/data").healthTipsData.map<never>
>;

function TipCard({ tip }: { tip: (typeof healthTipsData)[number] }) {
  return (
    <Link
      href={tip.href}
      className={`group relative rounded-2xl bg-gradient-to-br ${tip.color} border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden`}
    >
      <div className="absolute -bottom-4 -right-4 text-6xl opacity-10 select-none pointer-events-none">
        {tip.icon}
      </div>

      <span className="text-3xl mb-4 block">{tip.icon}</span>
      <h3 className={`text-base font-bold mb-1.5 ${tip.accent}`}>
        {tip.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
        {tip.shortDesc}
      </p>

      <div
        className={`mt-4 flex items-center gap-1 text-xs font-semibold ${tip.accent} opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        Дэлгэрэнгүй
        <svg
          className="w-3.5 h-3.5"
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
    </Link>
  );
}
