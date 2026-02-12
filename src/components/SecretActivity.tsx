"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestStore } from "@/store/store";
import ProgressBar from "./ProgressBar";
import DocumentationForm from "./DocumentationForm";
import FloatingEmojis from "./FloatingEmojis";

const EMOJIS = [
    { emoji: "🤫", top: "8%", right: "6%", rotate: 12, size: "2.8rem" },
    { emoji: "🔒", top: "20%", left: "4%", rotate: -14, size: "2.4rem" },
    { emoji: "✨", bottom: "28%", right: "5%", rotate: 18, size: "2.3rem" },
    { emoji: "🎁", bottom: "15%", left: "6%", rotate: -10, size: "2.6rem" },
    { emoji: "🙈", top: "45%", right: "3%", rotate: 20, size: "2.2rem" },
    { emoji: "💫", top: "55%", left: "3%", rotate: -16, size: "2rem" },
];

export default function SecretActivity() {
    const { sections, confirmArrival } = useQuestStore();
    const sectionData = sections.secret;
    const [isRevealed, setIsRevealed] = useState(sectionData.confirmed);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleReveal = () => {
        confirmArrival("secret");
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
            setIsRevealed(true);
        }, 1800);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative overflow-hidden"
        >
            <FloatingEmojis emojis={EMOJIS} />
            <ProgressBar current={2} total={4} />

            <AnimatePresence mode="wait">
                {showFeedback ? (
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
                            Hayo, kaget nggak pas nyampe sini? 😏
                        </motion.p>
                    </motion.div>
                ) : !isRevealed ? (
                    <motion.div
                        key="mystery"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-8 flex flex-col items-center justify-center relative z-10"
                        style={{ minHeight: "70vh" }}
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs tracking-[0.2em] uppercase mb-6"
                            style={{ color: "#8C7E76" }}
                        >
                            Something awaits
                        </motion.p>

                        {/* Mystery card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="w-full max-w-xs text-center mb-10"
                            style={{
                                border: "1.5px solid #E8DDD5",
                                borderRadius: "4px",
                                padding: "48px 32px",
                            }}
                        >
                            <motion.div
                                className="text-5xl mb-6"
                                animate={{ rotate: [0, 3, -3, 0] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                🤫
                            </motion.div>

                            <h2
                                className="text-xl font-normal mb-3"
                                style={{
                                    fontFamily:
                                        "var(--font-playfair), 'Playfair Display', serif",
                                    color: "#2D2420",
                                }}
                            >
                                Secret Activity
                            </h2>

                            <div
                                className="w-6 h-px mx-auto mb-4"
                                style={{ background: "#C83232" }}
                            />

                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "#8C7E76" }}
                            >
                                No spoilers.
                                <br />
                                Just trust the journey.
                            </p>
                        </motion.div>

                        {/* Reveal button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleReveal}
                            className="w-full max-w-xs py-4 text-sm font-medium tracking-wide text-white transition-all"
                            style={{
                                background: "#C83232",
                                borderRadius: "4px",
                            }}
                        >
                            I&apos;VE ARRIVED
                        </motion.button>
                    </motion.div>
                ) : !sectionData.documented ? (
                    <DocumentationForm key="documentation" sectionKey="secret" />
                ) : null}
            </AnimatePresence>
        </motion.div>
    );
}
