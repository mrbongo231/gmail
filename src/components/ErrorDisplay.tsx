"use client";

import { motion } from "framer-motion";

interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
    onBack: () => void;
}

export default function ErrorDisplay({
    message,
    onRetry,
    onBack,
}: ErrorDisplayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                width: "100%",
                maxWidth: 480,
                textAlign: "center",
            }}
        >
            {/* Error Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    delay: 0.1,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                }}
                style={{ marginBottom: 28 }}
            >
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "var(--color-error-glow)",
                        border: "2px solid rgba(248, 113, 113, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        fontSize: 28,
                    }}
                >
                    ✕
                </div>
            </motion.div>

            {/* Text */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                style={{
                    fontSize: 24,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                }}
            >
                Delivery failed
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                style={{
                    fontSize: 14,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: 12,
                }}
            >
                We couldn&apos;t send your email. Here&apos;s what we know:
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{
                    padding: "12px 20px",
                    borderRadius: 10,
                    background: "var(--color-error-glow)",
                    border: "1px solid rgba(248, 113, 113, 0.15)",
                    color: "var(--color-error)",
                    fontSize: 13,
                    marginBottom: 32,
                    display: "inline-block",
                    maxWidth: "100%",
                    wordBreak: "break-word",
                }}
            >
                {message}
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                }}
            >
                <button className="btn-ghost" onClick={onBack}>
                    ← Start over
                </button>
                <button className="btn-glow" onClick={onRetry}>
                    ↻ Try again
                </button>
            </motion.div>
        </motion.div>
    );
}
