"use client";

import { motion } from "framer-motion";

interface EmojiDecor {
    emoji: string;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    rotate: number;
    size: string;
    delay?: number;
}

interface FloatingEmojisProps {
    emojis: EmojiDecor[];
}

export default function FloatingEmojis({ emojis }: FloatingEmojisProps) {
    return (
        <>
            {emojis.map((dec, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={{ opacity: 0.7, scale: 1, rotate: dec.rotate }}
                    transition={{
                        delay: (dec.delay ?? 0.6) + i * 0.1,
                        type: "spring",
                        stiffness: 180,
                        damping: 14,
                    }}
                    className="absolute z-0 select-none pointer-events-none"
                    style={{
                        top: dec.top,
                        bottom: dec.bottom,
                        left: dec.left,
                        right: dec.right,
                        fontSize: dec.size,
                        filter: "drop-shadow(1px 3px 5px rgba(0,0,0,0.1))",
                    }}
                >
                    {dec.emoji}
                </motion.div>
            ))}
        </>
    );
}
