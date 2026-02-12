"use client";

import { motion } from "framer-motion";
import { useQuestStore } from "@/store/store";
import FloatingEmojis from "./FloatingEmojis";

const EMOJIS = [
    { emoji: "💌", top: "8%", left: "5%", rotate: -15, size: "2.8rem" },
    { emoji: "🌹", top: "12%", right: "8%", rotate: 12, size: "3rem" },
    { emoji: "✨", top: "35%", left: "3%", rotate: -8, size: "2.2rem" },
    { emoji: "💕", bottom: "28%", right: "5%", rotate: 18, size: "2.5rem" },
    { emoji: "🦋", bottom: "15%", left: "8%", rotate: -20, size: "2.4rem" },
    { emoji: "🎀", top: "55%", right: "4%", rotate: 25, size: "2.2rem" },
];

export default function WelcomeScreen() {
    const nextStep = useQuestStore((s) => s.nextStep);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative overflow-hidden"
        >
            {/* Top-left decorative red shape */}
            <div
                className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-80"
                style={{
                    background:
                        "radial-gradient(circle, #C83232 0%, #C83232 40%, transparent 70%)",
                    filter: "blur(1px)",
                }}
            />

            {/* Bottom-right decorative red shape */}
            <div
                className="absolute -bottom-24 -right-20 w-80 h-80 opacity-75"
                style={{
                    background:
                        "radial-gradient(ellipse at 60% 50%, #C83232 0%, #C83232 45%, transparent 70%)",
                    filter: "blur(1px)",
                    borderRadius: "50% 50% 20% 50%",
                }}
            />

            {/* Floating emoji decorations */}
            <FloatingEmojis emojis={EMOJIS} />

            {/* Content */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs tracking-[0.3em] uppercase mb-12 relative z-10"
                style={{ color: "#8C7E76" }}
            >
                February 14, 2026
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl leading-snug mb-6 font-normal relative z-10"
                style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    color: "#2D2420",
                }}
            >
                Love is the art,
                <br />
                and you are my
                <br />
                masterpiece.
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="w-8 h-px mb-8 relative z-10"
                style={{ background: "#C83232" }}
            />

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-sm max-w-[260px] mb-14 leading-relaxed relative z-10"
                style={{ color: "#8C7E76" }}
            >
                A journey of 4 moments, waiting to be lived and remembered together.
            </motion.p>

            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                className="px-12 py-3.5 text-sm font-medium tracking-wide text-white transition-all relative z-10"
                style={{
                    background: "#C83232",
                    borderRadius: "2px",
                }}
            >
                Begin Our Quest
            </motion.button>
        </motion.div>
    );
}
