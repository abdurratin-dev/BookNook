import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import NewArrivals from "@/components/home/NewArrivals";
import Features from "@/components/home/Features";
import KeyFeatures from "@/components/home/KeyFeatures";
import Marquee from "@/components/home/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <NewArrivals />
      <Marquee />
      <KeyFeatures />
      <Features />
    </>
  );
}
