"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useQuestStore } from "@/store/store";
import FloatingEmojis from "./FloatingEmojis";

const EMOJIS = [
    { emoji: "🎭", top: "6%", right: "6%", rotate: 14, size: "2.6rem" },
    { emoji: "💫", top: "15%", left: "4%", rotate: -12, size: "2.3rem" },
    { emoji: "🌸", bottom: "20%", right: "5%", rotate: 20, size: "2.4rem" },
    { emoji: "🎵", bottom: "12%", left: "6%", rotate: -18, size: "2.2rem" },
    { emoji: "💝", top: "42%", right: "3%", rotate: 10, size: "2rem" },
];

function getMoodEmoji(val: number): string {
    if (val <= 20) return "😐";
    if (val <= 40) return "🙂";
    if (val <= 60) return "😊";
    if (val <= 80) return "😄";
    return "🥰";
}

function getMoodLabel(val: number): string {
    if (val <= 20) return "Biasa aja";
    if (val <= 40) return "Lumayan";
    if (val <= 60) return "Seneng";
    if (val <= 80) return "Happy banget!";
    return "Loveee!";
}

export default function MoodMeter() {
    const { setMood, nextStep } = useQuestStore();
    const [value, setValue] = useState(50);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const updateValue = useCallback((clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const newVal = Math.round((x / rect.width) * 99) + 1;
        setValue(newVal);
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updateValue(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return;
        updateValue(e.clientX);
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    const handleConfirm = () => {
        setMood(value);
        setTimeout(() => nextStep(), 400);
    };

    const pct = ((value - 1) / 99) * 100;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
        >
            <FloatingEmojis emojis={EMOJIS} />

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs tracking-[0.3em] uppercase mb-4 relative z-10"
                style={{ color: "#8C7E76" }}
            >
                Before we begin
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-normal text-center mb-3 relative z-10"
                style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    color: "#2D2420",
                }}
            >
                How excited
                <br />
                are you?
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-6 h-px mb-10 relative z-10"
                style={{ background: "#C83232" }}
            />

            {/* Emoji & number */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center mb-3 relative z-10"
            >
                <span className="text-5xl mb-2">{getMoodEmoji(value)}</span>
                <span
                    className="text-4xl font-light tabular-nums"
                    style={{
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                        color: "#C83232",
                    }}
                >
                    {value}
                </span>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm mb-10 relative z-10"
                style={{ color: "#8C7E76" }}
            >
                {getMoodLabel(value)}
            </motion.p>

            {/* Slider track */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-xs mb-4 relative z-10"
            >
                <div
                    ref={trackRef}
                    className="relative h-10 flex items-center cursor-pointer select-none"
                    style={{ touchAction: "none" }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                >
                    {/* Track bg */}
                    <div
                        className="absolute w-full h-1.5 rounded-full"
                        style={{ background: "#E8DDD5" }}
                    />
                    {/* Filled */}
                    <div
                        className="absolute h-1.5 rounded-full transition-[width] duration-75"
                        style={{ background: "#C83232", width: `${pct}%` }}
                    />
                    {/* Thumb */}
                    <div
                        className="absolute w-7 h-7 rounded-full shadow-md transition-[left] duration-75 flex items-center justify-center"
                        style={{
                            background: "#C83232",
                            left: `calc(${pct}% - 14px)`,
                            border: "3px solid #fff",
                        }}
                    />
                </div>

                <div
                    className="flex justify-between text-[10px] tracking-wider mt-1"
                    style={{ color: "#B0A399" }}
                >
                    <span>1</span>
                    <span>100</span>
                </div>
            </motion.div>

            {/* Confirm */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleConfirm}
                className="w-full max-w-xs py-3.5 text-sm font-medium tracking-wide text-white transition-all mt-6 relative z-10"
                style={{ background: "#C83232", borderRadius: "4px" }}
            >
                Let&apos;s Go! →
            </motion.button>
        </motion.div>
    );
}
