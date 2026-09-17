import { CtaSection } from "@/features/cta";
import { DatabaseCatalogSection } from "@/features/database-catalog";
import { FaqSection } from "@/features/faq";
import { FeaturesSection } from "@/features/features-showcase";
import { HeroSection } from "@/features/hero";
import { LanguagesSection } from "@/features/languages";
import { ScreenshotsSection } from "@/features/screenshots";
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

      <CtaSection />
    </>
  );
};

export default Home;
