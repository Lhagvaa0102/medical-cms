"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Бидний тухай", href: "/about-us" },
    { label: "Зөвлөмж Зөвөлгөө", href: "/education" },
    { label: "Мэдээ Нийтлэл ", href: "/news" },
    { label: "Хурал зөвөлгөөн", href: "/meeting" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-2 py-2">
        <div className="flex items-center justify-between mb-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-20 h-20 flex items-center justify-center">
              <Image
                src="/Logo.jpg"
                alt="POSM Logo"
                width={128}
                height={128}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight group-hover:text-teal-600 transition-colors">
                POSM
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                Монголын Хүүхдийн Гэмтэл Согог Судлалын Нийгэмлэг
              </p>
            </div>
          </Link>

          {/* CTA Buttons + mobile toggle */}
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
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-teal-600 transition"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav
          className={`${isMenuOpen ? "block" : "hidden"} md:block border-t border-gray-100 md:border-t-0 pt-6 md:pt-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 md:py-3 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 md:hover:bg-transparent rounded-lg md:rounded-none transition-colors border-l-4 border-transparent md:border-l-0 md:border-b-2 md:border-b-transparent md:hover:border-b-teal-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Accent line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-500" />
    </header>
  );
}
