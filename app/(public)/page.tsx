import { Hero } from "@/components/landing/Hero";
import { BenefitsStrip } from "@/components/landing/BenefitsStrip";
import { Stats } from "@/components/landing/Stats";
import { Pillars } from "@/components/landing/Pillars";
import { ComparatorPreview } from "@/components/landing/ComparatorPreview";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { Testimonials } from "@/components/landing/Testimonials";
import { AppBanner } from "@/components/landing/AppBanner";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <BenefitsStrip />
      <Stats />
      <Pillars />
      <ComparatorPreview />
      <ProductGrid />
      <Testimonials />
      <AppBanner />
      <FinalCTA />
    </>
  );
}
