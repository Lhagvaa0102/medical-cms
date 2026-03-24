// ── Shared UI helpers used across home section components ─────────────────────

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({ eyebrow, title, href, linkLabel }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1">
          {eyebrow}
        </p>
        <h2
          className="text-3xl font-extrabold text-gray-900"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {title}
        </h2>
      </div>
      {href && (
        <a
          href={href}
          className="hidden sm:flex items-center gap-1.5 text-sm text-teal-600 font-semibold hover:text-teal-800 transition"
        >
          {linkLabel || "Бүгдийг харах"}
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

interface CategoryBadgeProps {
  label: string;
}

export function CategoryBadge({ label }: CategoryBadgeProps) {
  const colors: Record<string, string> = {
    Мэдээ: "bg-teal-100 text-teal-700",
    Нийтлэл: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
        colors[label] || "bg-gray-100 text-gray-500"
      }`}
    >
      {label}
    </span>
  );
}

interface ChevronRightProps {
  className?: string;
}

export function ChevronRight({ className = "w-4 h-4" }: ChevronRightProps) {
  return (
    <svg
      className={className}
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
  );
}

interface PinIconProps {
  className?: string;
}

export function PinIcon({ className = "w-3.5 h-3.5" }: PinIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
