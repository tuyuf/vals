"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuestStore } from "@/store/store";
import { SECTIONS } from "@/data/sections";
import html2canvas from "html2canvas-pro";

const ACTIVITY_LABELS: Record<string, string> = {
    photobox: "Photobox",
    secret: "Secret Activity",
    dinner: "Dinner",
    dessert: "Dessert",
};

/* Brutalism-sized decorations — oversized, bold, unapologetic */
const DECORATIONS = [
    { emoji: "💐", top: "-3%", left: "-12%", rotate: -18, size: "5.5rem" },
    { emoji: "🍓", top: "22%", right: "-10%", rotate: 12, size: "5rem" },
    { emoji: "🎫", bottom: "18%", left: "-10%", rotate: -22, size: "4.5rem" },
    { emoji: "💄", bottom: "5%", right: "-8%", rotate: 28, size: "4rem" },
    { emoji: "🌹", top: "50%", left: "-14%", rotate: 8, size: "4.5rem" },
    { emoji: "🍫", top: "75%", right: "-12%", rotate: -10, size: "4rem" },
];

export default function DigitalAlbum() {
    const { sections, mood, moodAfter, reset } = useQuestStore();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const albumRef = useRef<HTMLDivElement>(null);

    const sectionKeys = ["photobox", "secret", "dinner", "dessert"];

    const handleDownloadAlbum = async () => {
        if (!albumRef.current) return;
        setSaving(true);
        try {
            const canvas = await html2canvas(albumRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#F5EDE4",
                logging: false,
            });
            const link = document.createElement("a");
            link.download = "valentine-quest-2026.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
            setSaved(true);
        } catch (error) {
            console.error("Failed to download album:", error);
            alert("Gagal download album 😢 Coba screenshot aja ya!");
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pb-16"
            style={{ background: "#F5EDE4" }}
        >
            {/* Capturable album area */}
            <div ref={albumRef} style={{ background: "#F5EDE4" }}>
                {/* Header */}
                <div className="px-8 pt-10 pb-6 text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-[10px] tracking-[0.3em] uppercase mb-3"
                        style={{ color: "#8C7E76" }}
                    >
                        Our Digital Photo Album
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-normal mb-2"
                        style={{
                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                            color: "#2D2420",
                        }}
                    >
                        Valentine&apos;s Quest 2026
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-6 h-px mx-auto mb-2"
                        style={{ background: "#C83232" }}
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xs"
                        style={{ color: "#B0A399" }}
                    >
                        Kayla & Fayyadh
                    </motion.p>
                </div>

                {/* Mood comparison */}
                {mood !== null && moodAfter !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center gap-6 mb-6"
                    >
                        <div className="text-center">
                            <p
                                className="text-[9px] tracking-[0.2em] uppercase mb-1"
                                style={{ color: "#B0A399" }}
                            >
                                Before
                            </p>
                            <p
                                className="text-lg font-light"
                                style={{
                                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                    color: "#C83232",
                                }}
                            >
                                {mood}
                            </p>
                        </div>
                        <div
                            className="w-px self-stretch"
                            style={{ background: "#E8DDD5" }}
                        />
                        <div className="text-center">
                            <p
                                className="text-[9px] tracking-[0.2em] uppercase mb-1"
                                style={{ color: "#B0A399" }}
                            >
                                After
                            </p>
                            <p
                                className="text-lg font-light"
                                style={{
                                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                    color: "#C83232",
                                }}
                            >
                                {moodAfter}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Single-page scrapbook photostrip */}
                <div className="px-6 pb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="relative mx-auto"
                        style={{ maxWidth: "340px" }}
                    >
                        {/* Brutalism decorative stickers — BIG and bold */}
                        {DECORATIONS.map((dec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                                animate={{ opacity: 0.85, scale: 1, rotate: dec.rotate }}
                                transition={{
                                    delay: 0.8 + i * 0.12,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 12,
                                }}
                                className="absolute z-10 select-none pointer-events-none"
                                style={{
                                    top: dec.top,
                                    left: dec.left,
                                    right: dec.right,
                                    bottom: dec.bottom,
                                    fontSize: dec.size,
                                    filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.15))",
                                }}
                            >
                                {dec.emoji}
                            </motion.div>
                        ))}

                        {/* Photostrip frame */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                background: "#8B1A1A",
                                borderRadius: "6px",
                                padding: "16px 14px",
                            }}
                        >
                            {/* Inner cream border */}
                            <div
                                style={{
                                    background: "#F5EDE4",
                                    borderRadius: "3px",
                                    padding: "8px",
                                }}
                            >
                                {/* All 4 photo frames in one strip */}
                                <div className="space-y-2">
                                    {sectionKeys.map((key, i) => {
                                        const section = sections[key];
                                        const activityLabel = ACTIVITY_LABELS[key] || key;
                                        const sectionConfig = SECTIONS.find(
                                            (s) => s.key === key
                                        );

                                        return (
                                            <motion.div
                                                key={key}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 + i * 0.15 }}
                                            >
                                                {/* Photo frame */}
                                                <div
                                                    className="overflow-hidden"
                                                    style={{
                                                        border: "4px solid #8B1A1A",
                                                        borderRadius: "2px",
                                                        background: "#FFFFFF",
                                                    }}
                                                >
                                                    {/* Photo area */}
                                                    <div
                                                        className="relative"
                                                        style={{
                                                            height: "140px",
                                                            background: section.photo
                                                                ? "transparent"
                                                                : "#F9F5F0",
                                                        }}
                                                    >
                                                        {section.photo ? (
                                                            <img
                                                                src={section.photo}
                                                                alt={section.placeName}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                                                <span className="text-3xl">
                                                                    {sectionConfig?.title?.split(" ")[0] || "📷"}
                                                                </span>
                                                                <p
                                                                    className="text-[10px] tracking-wider uppercase"
                                                                    style={{ color: "#C5B9B0" }}
                                                                >
                                                                    {activityLabel}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Caption area */}
                                                    <div
                                                        className="px-3 py-2"
                                                        style={{ background: "#FFFFFF" }}
                                                    >
                                                        <p
                                                            className="text-[9px] tracking-[0.15em] uppercase font-medium mb-0.5"
                                                            style={{ color: "#8B1A1A" }}
                                                        >
                                                            Our {activityLabel} at {section.placeName}
                                                        </p>
                                                        {section.description && (
                                                            <p
                                                                className="text-[11px] leading-relaxed"
                                                                style={{
                                                                    color: "#8C7E76",
                                                                    fontFamily:
                                                                        "var(--font-playfair), 'Playfair Display', serif",
                                                                    fontStyle: "italic",
                                                                }}
                                                            >
                                                                &ldquo;{section.description}&rdquo;
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Actions — outside the capturable area */}
            <div className="px-8 mt-4 space-y-3">
                {!saved ? (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleDownloadAlbum}
                        disabled={saving}
                        className="w-full py-3.5 text-sm font-medium tracking-wide text-white transition-all"
                        style={{ background: "#8B1A1A", borderRadius: "4px" }}
                    >
                        {saving ? "Downloading..." : "Save Album Forever ♡"}
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full py-3.5 text-center text-sm font-medium"
                        style={{
                            color: "#8B1A1A",
                            border: "1.5px solid #8B1A1A",
                            borderRadius: "4px",
                        }}
                    >
                        ✓ Album Downloaded!
                    </motion.div>
                )}

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    onClick={() => reset()}
                    className="w-full py-3 text-xs tracking-[0.15em] uppercase transition-all"
                    style={{ color: "#B0A399" }}
                >
                    Start New Quest
                </motion.button>
            </div>
        </motion.div>
    );
}
