import { CtaSection } from "@/features/cta";
import { DatabaseCatalogSection } from "@/features/database-catalog";
import { FaqSection } from "@/features/faq";
import { FeaturesSection } from "@/features/features-showcase";
import { HeroSection } from "@/features/hero";
import { LanguagesSection } from "@/features/languages";
import { OpenSourceSection } from "@/features/open-source";
import { ScreenshotsSection } from "@/features/screenshots";
import { WhatsNewSection } from "@/features/whats-new";
import { WorkflowSection } from "@/features/workflow";

const Home = () => {
  return (
    <>
      <HeroSection />

      <FeaturesSection />

      <WorkflowSection />

      <DatabaseCatalogSection />

      <LanguagesSection />

      <ScreenshotsSection />

      <FaqSection />

      <OpenSourceSection />

      <WhatsNewSection />

      <CtaSection />
    </>
  );
};

export default Home;
