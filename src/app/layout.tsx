import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

// ── Fonts ─────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"], // Монгол кирилл
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto",
  display: "swap",
});

// ── Metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  title: "POSM — Монголын Хүүхдийн Ортопед Травматологийн Нийгэмлэг",
  description: "Pediatric Orthopedic Society of Mongolia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className={`${inter.variable} ${notoSans.variable}`}>
      <body className="font-noto antialiased bg-white text-slate-900">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
