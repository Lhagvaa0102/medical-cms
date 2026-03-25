"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HIDDEN_ROUTES = ["/admin", "/login"];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  const showShell = !HIDDEN_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <>
      {showShell && <Header />}
      {children}
      {showShell && <Footer />}
    </>
  );
}
