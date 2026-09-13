import { CtaSection } from "@/features/cta";
import { FaqSection } from "@/features/faq";
import { FeaturesSection } from "@/features/features-showcase";
import { HeroSection } from "@/features/hero";
import { ScreenshotsSection } from "@/features/screenshots";
import { WorkflowSection } from "@/features/workflow";

const Home = () => {
  return (
    <>
      <HeroSection />

      <FeaturesSection />

      <WorkflowSection />

      <ScreenshotsSection />

      <FaqSection />

      <CtaSection />
    </>
  );
};

export default Home;
