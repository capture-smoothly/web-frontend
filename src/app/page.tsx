import { SnapshotNavbar } from "@/components/sections/SnapshotNavbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeatureShowcaseSection } from "@/components/sections/FeatureShowcaseSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { SnapshotFooter } from "@/components/sections/SnapshotFooter";
import { FloatingInstallButton } from "@/components/ui/FloatingInstallButton";

export default function Home() {
  return (
    <>
      <SnapshotNavbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <FeatureShowcaseSection />
        <ComparisonSection />
        <UseCasesSection />
        <PricingSection />
        <TestimonialsSection />
        <RoadmapSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <SnapshotFooter />
      <FloatingInstallButton />
    </>
  );
}
