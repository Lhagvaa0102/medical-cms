import HealthTips from "@/components/Healthtips";
import HeroSection from "@/components/Hero";
import JoinCTA from "@/components/Joincta";
import LatestNews from "@/components/Latestnews";
import UpcomingMeetings from "@/components/Upcomingmeetings";

export default function HomePage() {
  return (
    <main className="bg-[#f8fafb]">
      <HeroSection />
      <UpcomingMeetings />
      <HealthTips />
      <LatestNews />
      <JoinCTA />
    </main>
  );
}
