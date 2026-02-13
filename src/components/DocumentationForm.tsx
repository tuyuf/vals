"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestStore } from "@/store/store";
import { SECTIONS } from "@/data/sections";
import { compressImage } from "@/lib/image-utils";
import FloatingEmojis from "./FloatingEmojis";

const PLACEHOLDERS: Record<string, string> = {
    photobox: "Tulis pose paling aneh kita...",
    secret: "Hayo, kaget nggak pas nyampe sini?",
    dinner: "Makanan favoritnya apa nih?",
    dessert: "Seberapa manis momen ini? 🍫",
};

const DOC_EMOJIS = [
    { emoji: "📝", top: "5%", right: "5%", rotate: 12, size: "2.4rem" },
    { emoji: "💭", top: "18%", left: "3%", rotate: -14, size: "2.2rem" },
    { emoji: "🖼️", bottom: "25%", right: "4%", rotate: 16, size: "2.3rem" },
    { emoji: "✏️", bottom: "12%", left: "5%", rotate: -10, size: "2rem" },
    { emoji: "📌", top: "42%", right: "2%", rotate: 20, size: "2.1rem" },
];

interface DocumentationFormProps {
    sectionKey: string;
}

export default function DocumentationForm({
    sectionKey,
}: DocumentationFormProps) {
    const { sections, setPhoto, setDescription, markDocumented, nextStep } =
        useQuestStore();
    const section = sections[sectionKey];
    const sectionConfig = SECTIONS.find((s) => s.key === sectionKey);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(section.photo);
    const [desc, setDesc] = useState(section.description);
    const [saving, setSaving] = useState(false);

    const placeholder = PLACEHOLDERS[sectionKey] || "What happened here?";

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            // Compress image to avoid localStorage quota (5MB limit)
            const base64 = await compressImage(file);
            setPreview(base64);
            setPhoto(sectionKey, base64);
        } catch (error) {
            console.error("Failed to compress image:", error);
            alert("Failed to process image. Please try a smaller photo.");
        }
    };

    const handleSave = () => {
        setSaving(true);
        setDescription(sectionKey, desc);
        markDocumented(sectionKey);
        setTimeout(() => {
            nextStep();
        }, 500);
    };

    const isValid = preview && desc.trim().length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="px-8 pb-12 relative overflow-hidden"
        >
            <FloatingEmojis emojis={DOC_EMOJIS} />

            {/* Header */}
            <div className="text-center mb-8 mt-4 relative z-10">
                <p
                    className="text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ color: "#8C7E76" }}
                >
                    Capture this moment
                </p>
                <h2
                    className="text-xl font-normal"
                    style={{
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                        color: "#2D2420",
                    }}
                >
                    Document the Memory
                </h2>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center relative z-10">
                <span
                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5"
                    style={{
                        color: "#8C7E76",
                        border: "1px solid #E8DDD5",
                        borderRadius: "2px",
                    }}
                >
                    {sectionConfig?.title}
                </span>
                <span
                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5"
                    style={{
                        color: "#C83232",
                        border: "1px solid #E8D5D0",
                        background: "#FDF5F3",
                        borderRadius: "2px",
                    }}
                >
                    {section.placeName}
                </span>
            </div>

            {/* Photo upload */}
            <div className="mb-6 relative z-10">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                />
                <AnimatePresence mode="wait">
                    {preview ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative overflow-hidden"
                            style={{ borderRadius: "4px" }}
                        >
                            <img
                                src={preview}
                                alt="Uploaded moment"
                                className="w-full h-52 object-cover"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-3 right-3 px-3 py-1.5 text-[10px] tracking-wider uppercase font-medium"
                                style={{
                                    background: "rgba(255,255,255,0.9)",
                                    color: "#2D2420",
                                    borderRadius: "2px",
                                }}
                            >
                                Change
                            </button>
                        </motion.div>
                    ) : (
                        <motion.button
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-44 flex flex-col items-center justify-center gap-3 transition-all"
                            style={{
                                border: "1.5px dashed #D5CBC2",
                                borderRadius: "4px",
                            }}
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#B0A399"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <div className="text-center">
                                <p className="text-xs font-medium" style={{ color: "#8C7E76" }}>
                                    Tap to upload photo
                                </p>
                                <p
                                    className="text-[10px] mt-0.5"
                                    style={{ color: "#C5B9B0" }}
                                >
                                    JPG, PNG
                                </p>
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Description */}
            <div className="mb-8 relative z-10">
                <label
                    className="block text-[10px] tracking-[0.2em] uppercase font-medium mb-2"
                    style={{ color: "#8C7E76" }}
                >
                    Your story
                </label>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full px-4 py-3 text-sm resize-none transition-all"
                    style={{
                        border: "1.5px solid #E8DDD5",
                        borderRadius: "4px",
                        background: "transparent",
                        color: "#2D2420",
                        outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#C83232")}
                    onBlur={(e) => (e.target.style.borderColor = "#E8DDD5")}
                />
            </div>

            {/* Save button */}
            <motion.button
                whileHover={isValid ? { scale: 1.01 } : {}}
                whileTap={isValid ? { scale: 0.99 } : {}}
                onClick={handleSave}
                disabled={!isValid || saving}
                className="w-full py-3.5 text-sm font-medium tracking-wide transition-all relative z-10"
                style={{
                    background: isValid ? "#C83232" : "#E8DDD5",
                    color: isValid ? "#ffffff" : "#B0A399",
                    borderRadius: "4px",
                    cursor: isValid ? "pointer" : "not-allowed",
                }}
            >
                {saving ? "Saving..." : "Save & Continue →"}
            </motion.button>
        </motion.div>
    );
}
