"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestStore } from "@/store/store";
import { SectionConfig } from "@/data/sections";
import ProgressBar from "./ProgressBar";
import DocumentationForm from "./DocumentationForm";
import FloatingEmojis from "./FloatingEmojis";

const FEEDBACK: Record<string, string> = {
    photobox: "TAU AKU TAU KAMU PILIH INI! YESYES! 📸",
    dinner: "NYOK MAM! 🍽️",
    dessert: "ooooo okey",
};

const SECTION_EMOJIS: Record<string, { emoji: string; top?: string; bottom?: string; left?: string; right?: string; rotate: number; size: string }[]> = {
    photobox: [
        { emoji: "📸", top: "10%", right: "5%", rotate: 12, size: "2.6rem" },
        { emoji: "🎞️", top: "25%", left: "3%", rotate: -15, size: "2.3rem" },
        { emoji: "✌️", bottom: "30%", right: "4%", rotate: 18, size: "2.4rem" },
        { emoji: "🪞", bottom: "15%", left: "5%", rotate: -10, size: "2.2rem" },
        { emoji: "💋", top: "50%", right: "3%", rotate: 22, size: "2rem" },
    ],
    dinner: [
        { emoji: "🍽️", top: "10%", left: "4%", rotate: -12, size: "2.6rem" },
        { emoji: "🕯️", top: "20%", right: "5%", rotate: 10, size: "2.4rem" },
        { emoji: "🥂", bottom: "25%", left: "3%", rotate: -18, size: "2.5rem" },
        { emoji: "🍝", bottom: "15%", right: "4%", rotate: 14, size: "2.3rem" },
        { emoji: "💕", top: "45%", left: "2%", rotate: 8, size: "2rem" },
    ],
    dessert: [
        { emoji: "🍰", top: "10%", right: "5%", rotate: 14, size: "2.6rem" },
        { emoji: "🍫", top: "22%", left: "4%", rotate: -12, size: "2.4rem" },
        { emoji: "🧁", bottom: "28%", right: "3%", rotate: 20, size: "2.3rem" },
        { emoji: "🍦", bottom: "12%", left: "5%", rotate: -16, size: "2.5rem" },
        { emoji: "☕", top: "48%", right: "2%", rotate: 10, size: "2.2rem" },
    ],
};

interface SectionSelectionProps {
    config: SectionConfig;
    sectionIndex: number;
}

export default function SectionSelection({
    config,
    sectionIndex,
}: SectionSelectionProps) {
    const { sections, setPlace, confirmArrival } = useQuestStore();
    const sectionData = sections[config.key];

    // Determine initial phase based on persisted state
    const getInitialPhase = () => {
        if (sectionData.documented) return "documentation" as const;
        if (sectionData.confirmed) return "documentation" as const;
        return "selection" as const;
    };

    const [selected, setSelected] = useState<string>(sectionData.placeName);
    const [phase, setPhase] = useState<"selection" | "feedback" | "documentation">(getInitialPhase);

    // Sync phase when section data changes (e.g. after navigating back)
    useEffect(() => {
        setPhase(getInitialPhase());
        setSelected(sectionData.placeName);
    }, [config.key]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSelect = (name: string) => {
        if (phase !== "selection") return;
        setSelected(name);
        setPlace(config.key, name);
    };

    const handleConfirm = () => {
        if (!selected) return;
        confirmArrival(config.key);
        setPhase("feedback");
        setTimeout(() => {
            setPhase("documentation");
        }, 1800);
    };

    const emojis = SECTION_EMOJIS[config.key] || SECTION_EMOJIS.photobox;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative overflow-hidden"
        >
            <FloatingEmojis emojis={emojis} />
            <ProgressBar current={sectionIndex} total={4} />

            <AnimatePresence mode="wait">
                {phase === "feedback" ? (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center px-8 relative z-10"
                        style={{ minHeight: "60vh" }}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-base text-center leading-relaxed"
                            style={{
                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                color: "#2D2420",
                            }}
                        >
                            {FEEDBACK[config.key] || "Let's go! ✨"}
                        </motion.p>
                    </motion.div>
                ) : phase === "selection" ? (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="px-8 pb-12 relative z-10"
                    >
                        {/* Header */}
                        <div className="text-center mb-10 mt-4">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-xs tracking-[0.2em] uppercase mb-3"
                                style={{ color: "#8C7E76" }}
                            >
                                Choose a place
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-normal"
                                style={{
                                    fontFamily:
                                        "var(--font-playfair), 'Playfair Display', serif",
                                    color: "#2D2420",
                                }}
                            >
                                {config.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-sm mt-2"
                                style={{ color: "#8C7E76" }}
                            >
                                {config.subtitle}
                            </motion.p>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-10">
                            {config.options?.map((option, i) => (
                                <motion.button
                                    key={option.name}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                    onClick={() => handleSelect(option.name)}
                                    className="w-full text-left transition-all duration-300"
                                    style={{
                                        padding: "18px 20px",
                                        border:
                                            selected === option.name
                                                ? "1.5px solid #C83232"
                                                : "1.5px solid #E8DDD5",
                                        borderRadius: "4px",
                                        background:
                                            selected === option.name ? "#FDF5F3" : "transparent",
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xl">{option.emoji}</span>
                                            <span
                                                className="text-sm font-medium"
                                                style={{
                                                    color:
                                                        selected === option.name ? "#C83232" : "#2D2420",
                                                }}
                                            >
                                                {option.name}
                                            </span>
                                        </div>
                                        <div
                                            className="w-5 h-5 rounded-full flex items-center justify-center transition-all"
                                            style={{
                                                border:
                                                    selected === option.name
                                                        ? "5px solid #C83232"
                                                        : "1.5px solid #C5B9B0",
                                            }}
                                        />
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Confirm button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            whileHover={selected ? { scale: 1.01 } : {}}
                            whileTap={selected ? { scale: 0.99 } : {}}
                            onClick={handleConfirm}
                            disabled={!selected}
                            className="w-full py-3.5 text-sm font-medium tracking-wide transition-all"
                            style={{
                                background: selected ? "#C83232" : "#E8DDD5",
                                color: selected ? "#ffffff" : "#B0A399",
                                borderRadius: "4px",
                                cursor: selected ? "pointer" : "not-allowed",
                            }}
                        >
                            Berangkat! →
                        </motion.button>
                    </motion.div>
                ) : (
                    <DocumentationForm key="documentation" sectionKey={config.key} />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
