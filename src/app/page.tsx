"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useQuestStore } from "@/store/store";
import { SECTIONS } from "@/data/sections";
import WelcomeScreen from "@/components/WelcomeScreen";
import MoodMeter from "@/components/MoodMeter";
import TeaserScreen from "@/components/TeaserScreen";
import SectionSelection from "@/components/SectionSelection";
import SecretActivity from "@/components/SecretActivity";
import MoodAfterDate from "@/components/MoodAfterDate";
import DigitalAlbum from "@/components/DigitalAlbum";

export default function Home() {
  const currentStep = useQuestStore((s) => s.currentStep);
  const prevStep = useQuestStore((s) => s.prevStep);

  // Don't show back on welcome (0) or teaser (2, auto-advancing)
  const showBack = currentStep > 0 && currentStep !== 2;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen key="welcome" />;
      case 1:
        return <MoodMeter key="mood" />;
      case 2:
        return <TeaserScreen key="teaser" />;
      case 3:
        return (
          <SectionSelection
            key="photobox"
            config={SECTIONS[0]}
            sectionIndex={1}
          />
        );
      case 4:
        return <SecretActivity key="secret" />;
      case 5:
        return (
          <SectionSelection
            key="dinner"
            config={SECTIONS[2]}
            sectionIndex={3}
          />
        );
      case 6:
        return (
          <SectionSelection
            key="dessert"
            config={SECTIONS[3]}
            sectionIndex={4}
          />
        );
      case 7:
        return <MoodAfterDate key="mood-after" />;
      case 8:
        return <DigitalAlbum key="album" />;
      default:
        return <WelcomeScreen key="welcome-fallback" />;
    }
  };

  return (
    <main className="relative z-10">
      {/* Back button */}
      {showBack && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={prevStep}
          className="fixed top-6 left-6 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-all"
          style={{
            background: "rgba(139, 26, 26, 0.08)",
            color: "#8B1A1A",
            fontSize: "18px",
          }}
        >
          ←
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

