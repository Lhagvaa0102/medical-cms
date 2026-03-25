"use client";
import { useState } from "react";

type Props = { images: string[] };

export default function NewsGallery({ images }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-5 h-px bg-teal-400" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Зургийн цомог · {images.length} зураг
          </h2>
        </div>

        {/* Horizontal scroll gallery */}
        <div
          className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={`flex-shrink-0 snap-start rounded-xl overflow-hidden border-2 border-transparent hover:border-teal-400 transition-all group ${
                images.length === 1 ? "w-full" : "w-64 md:w-80"
              }`}
            >
              <img
                src={src}
                alt={`Зураг ${i + 1}`}
                className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                  images.length === 1 ? "w-full h-80" : "w-full h-48"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Scroll hint */}
        {images.length > 2 && (
          <p className="text-xs text-slate-400 mt-2 text-center">
            ← хажуу тийш гүйлгэнэ →
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none z-10"
          >
            ×
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl leading-none z-10 px-2"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <img
            src={images[lightbox]}
            alt={`Зураг ${lightbox + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl leading-none z-10 px-2"
            >
              ›
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
