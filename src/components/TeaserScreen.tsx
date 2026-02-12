"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuestStore } from "@/store/store";
import FloatingEmojis from "./FloatingEmojis";

const clues = [
    "TEBAKK MAU KEMANA?",
    "CLUE NYA POTOO",
    "CISSS! 📸",
];

const EMOJIS = [
    { emoji: "🔮", top: "10%", left: "6%", rotate: -10, size: "2.8rem", delay: 0.2 },
    { emoji: "👀", top: "8%", right: "8%", rotate: 15, size: "2.5rem", delay: 0.4 },
    { emoji: "❓", bottom: "25%", left: "5%", rotate: -20, size: "2.6rem", delay: 0.6 },
    { emoji: "🗺️", bottom: "18%", right: "6%", rotate: 12, size: "2.4rem", delay: 0.8 },
    { emoji: "💭", top: "40%", left: "3%", rotate: 8, size: "2.2rem", delay: 1.0 },
    { emoji: "📍", top: "45%", right: "4%", rotate: -14, size: "2.3rem", delay: 1.2 },
];

export default function TeaserScreen() {
    const nextStep = useQuestStore((s) => s.nextStep);
    const [clueIndex, setClueIndex] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setClueIndex(1), 3000);
        const t2 = setTimeout(() => setClueIndex(2), 6000);
        const t3 = setTimeout(() => nextStep(), 9000);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [nextStep]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative overflow-hidden"
        >
            <FloatingEmojis emojis={EMOJIS} />

            {/* Animated dots */}
            <div className="flex gap-1.5 mb-8 relative z-10">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#C83232" }}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Clue text */}
            <motion.p
                key={clueIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-normal relative z-10"
                style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    color: "#2D2420",
                }}
            >
                {clues[clueIndex]}
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
                className="text-xs mt-6 relative z-10"
                style={{ color: "#B0A399" }}
            >
                Loading our adventure...
            </motion.p>
        </motion.div>
    );
}
