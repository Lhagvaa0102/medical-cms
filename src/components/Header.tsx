"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Бидний тухай", href: "/about-us", icon: "🏛️" },
    { label: "Зөвлөмж Зөвөлгөө", href: "/education", icon: "📋" },
    { label: "Мэдээ Нийтлэл", href: "/news", icon: "📰" },
    { label: "Хурал зөвөлгөөн", href: "/meeting", icon: "🗓️" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-2 py-2">
          <div className="flex items-center justify-between mb-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
                <Image
                  src="/Logo.png"
                  alt="POSM Logo"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight group-hover:text-teal-600 transition-colors">
                  POSM
                </h1>
                {/* Subtitle — зөвхөн desktop */}
                <p className="hidden md:block text-sm text-gray-500 font-medium">
                  Монголын Хүүхдийн Гэмтэл Согог Судлалын Нийгэмлэг
                </p>
              </div>
            </Link>

            {/* CTA + toggle */}
            <div className="flex items-center gap-3">
              <a
                href="/join"
                className="hidden sm:inline-flex px-5 py-2 text-[12px] font-semibold uppercase tracking-widest text-slate-700 border border-slate-200 rounded-full hover:border-slate-400 hover:text-slate-900 transition-all duration-200"
              >
                Элсэх
              </a>
              <a
                href="/donate"
                className="inline-flex px-5 py-2 text-[12px] font-semibold uppercase tracking-widest text-white bg-slate-900 rounded-full hover:bg-teal-600 transition-all duration-300"
              >
                Хандив
              </a>

              {/* Animated hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px] rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Цэс"
              >
                <span
                  className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:block border-t border-gray-100 pt-0">
            <div className="flex flex-row items-center justify-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors border-b-2 border-transparent hover:border-b-teal-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-500" />
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <Image
              src="/Logo.png"
              alt="POSM"
              width={36}
              height={36}
              className="object-contain"
            />
            <div>
              <p className="font-bold text-slate-800 leading-tight">POSM</p>
              <p className="text-[10px] text-teal-500 font-medium leading-tight">
                Хүүхдийн ортопед
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                isActive(link.href)
                  ? "bg-teal-50 text-teal-700 border border-teal-100"
                  : "text-gray-700 hover:bg-gray-50 hover:text-teal-600"
              }`}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
              {isActive(link.href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <a
            href="/join"
            className="flex items-center justify-center w-full py-3 text-sm font-semibold text-teal-700 border-2 border-teal-200 rounded-xl hover:bg-teal-50 transition-colors"
          >
            Гишүүн болох
          </a>
          <a
            href="/donate"
            className="flex items-center justify-center w-full py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-teal-600 transition-colors"
          >
            💚 Хандив өргөх
          </a>
        </div>
      </div>
    </>
  );
}
