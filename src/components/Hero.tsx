"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { stats } from "../data";

type HeroNews = {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
};

// Fallback slide хэрэв DB хоосон байвал
const FALLBACK: HeroNews[] = [
  {
    _id: "fallback",
    title: "Хүүхдийн эрүүл мэнд —\nманай нийгмийн\nирээдүй",
    excerpt:
      "Монголын Хүүхдийн Ортопед Травматологийн Нийгэмлэг нь хүүхдийн яс, үе мөч, нугасны өвчин эмгэгийг оношлох, эмчлэх, урьдчилан сэргийлэх чиглэлээр үйл ажиллагаа явуулдаг.",
    category: "Монголын Хүүхдийн Ортопед",
    imageUrl: "",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState<HeroNews[]>(FALLBACK);
  const [loaded, setLoaded] = useState(false);

  // DB-ээс highlight мэдээ татах
  useEffect(() => {
    fetch("/api/news?highlight=1&limit=4")
      .then((r) => r.json())
      .then((data: HeroNews[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Автомат slide
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      6000,
    );
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[active] ?? FALLBACK[0];

  return (
    <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-slate-900">
      {/* ── Background image layer ── */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <div
            key={s._id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {s.imageUrl ? (
              <Image
                src={s.imageUrl}
                alt=""
                fill
                className="object-cover object-center"
                priority={i === 0}
              />
            ) : (
              // Зураг байхгүй үед gradient дэвсгэр
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-teal-900/60 to-slate-900" />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-teal-900/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8fafb] to-transparent" />
      </div>

      {/* ── Decorative vertical line ── */}
      <div className="absolute left-[max(2rem,calc(50%-40rem))] top-0 bottom-0 w-px bg-white/10 z-10" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-6 h-px bg-teal-400" />
            <span className="text-teal-300 text-xs font-bold uppercase tracking-[0.2em]">
              {slide.category}
            </span>
          </div>

          <h1
            key={active}
            className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 whitespace-pre-line animate-fade-in-up"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {slide.title}
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg line-clamp-3">
            {slide.excerpt}
          </p>

          <div className="flex flex-wrap gap-3">
            {slide._id !== "fallback" && (
              <Link
                href={`/news/${slide._id}`}
                className="px-7 py-3.5 bg-teal-500 text-white text-sm font-bold rounded-full hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30"
              >
                Дэлгэрэнгүй унших
              </Link>
            )}
            <Link
              href="/news"
              className="px-7 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Бүх мэдээ
            </Link>
          </div>
        </div>

        {/* ── Slide dots ── */}
        {slides.length > 1 && (
          <div className="absolute bottom-12 left-4 md:left-1/2 md:-translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-teal-400" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Stats bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-t-3xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-5 text-center">
                <p className="text-2xl font-extrabold text-teal-600">
                  {s.value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
