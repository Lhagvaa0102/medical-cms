import ConditionsPreview from "@/components/ConditionsPreview";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NewsPreview from "@/components/NewsPreview";
import QuickCards from "@/components/QuickCards";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickCards />
      <ConditionsPreview />
      <NewsPreview />
    </>
  );
}
