"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    return (
        <div className="w-full px-8 pt-6 pb-4">
            <div className="flex items-center justify-between mb-3">
                <span
                    className="text-[10px] tracking-[0.2em] uppercase font-medium"
                    style={{ color: "#8C7E76" }}
                >
                    Step {current} of {total}
                </span>
            </div>
            <div className="flex gap-2 justify-center">
                {Array.from({ length: total }, (_, i) => {
                    const isFilled = i < current;
                    const isCurrent = i === current - 1;
                    return (
                        <motion.span
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.08, type: "spring" as const, stiffness: 400, damping: 15 }}
                            className="text-lg"
                            style={{
                                filter: isFilled ? "none" : "grayscale(1) opacity(0.3)",
                            }}
                        >
                            <motion.span
                                animate={
                                    isCurrent
                                        ? { scale: [1, 1.15, 1] }
                                        : {}
                                }
                                transition={
                                    isCurrent
                                        ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                        : {}
                                }
                                style={{ display: "inline-block" }}
                            >
                                {isFilled ? "❤️" : "🤍"}
                            </motion.span>
                        </motion.span>
                    );
                })}
            </div>
        </div>
    );
}
