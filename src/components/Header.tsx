"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Our Society", href: "/about" },
    { label: "IPOS®", href: "/ipos" },
    { label: "Physician Education", href: "/education" },
    { label: "Research", href: "/research" },
    { label: "Career Resources", href: "/careers" },
    { label: "News", href: "/news" },
    { label: "Members", href: "/members" },
  ];

  const ctaButtons = [
    { label: "JOIN", href: "/join", variant: "secondary" },
    { label: "DONATE", href: "/donate", variant: "primary" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="bg-linear-to-r from-teal-600 to-blue-600 text-white text-xs">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@posna.org"
              className="hover:text-teal-100 transition"
            >
              info@posna.org
            </a>
            <span className="text-teal-300">•</span>
            <a
              href="tel:+1234567890"
              className="hover:text-teal-100 transition"
            >
              +1 (234) 567-890
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-teal-100 transition">
              Contact
            </a>
            <span className="text-teal-300">•</span>
            <a href="#" className="hover:text-teal-100 transition">
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-linear-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                POSNA
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Pediatric Orthopedic Society of North America
              </p>
            </div>
          </Link>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/join"
              className="px-5 py-2.5 text-sm font-semibold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
            >
              Join
            </a>
            <a
              href="/donate"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-teal-600 to-blue-600 rounded-lg hover:shadow-lg transition-all"
            >
              Donate
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-teal-600 transition"
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

        {/* Main Navigation */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block border-t border-gray-100 md:border-t-0 pt-6 md:pt-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 md:py-3 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 md:hover:bg-transparent rounded-lg md:rounded-none transition-colors border-l-4 md:border-l-0 md:border-b-2 md:border-b-transparent md:hover:border-b-teal-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Accent Line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-500" />
    </header>
  );
}
