"use client";

import { motion } from "framer-motion";

interface SuccessViewProps {
    recipient: string;
    onReset: () => void;
}

export default function SuccessView({ recipient, onReset }: SuccessViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                width: "100%",
                maxWidth: 480,
                textAlign: "center",
            }}
        >
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    delay: 0.2,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                }}
                style={{ marginBottom: 32 }}
            >
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "var(--color-success-glow)",
                        border: "2px solid rgba(52, 211, 153, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                    }}
                >
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        className="check-circle"
                    >
                        <path
                            className="check-mark"
                            d="M10 18L16 24L26 12"
                            stroke="var(--color-success)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </motion.div>

            {/* Text */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{
                    fontSize: 28,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: 10,
                }}
            >
                Email sent
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                    fontSize: 15,
                    color: "var(--color-text-secondary)",
                    marginBottom: 8,
                    lineHeight: 1.5,
                }}
            >
                Your email was successfully delivered to
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                style={{
                    fontSize: 14,
                    color: "var(--color-accent-primary)",
                    background: "var(--color-accent-glow)",
                    display: "inline-block",
                    padding: "6px 16px",
                    borderRadius: 8,
                    border: "1px solid rgba(124, 100, 255, 0.2)",
                    marginBottom: 40,
                }}
            >
                {recipient}
            </motion.p>

            {/* Particles */}
            <div style={{ position: "relative", height: 0 }}>
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0.5],
                            x: (Math.random() - 0.5) * 200,
                            y: (Math.random() - 0.5) * 150 - 100,
                        }}
                        transition={{
                            delay: 0.3 + i * 0.1,
                            duration: 1.2,
                            ease: "easeOut",
                        }}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: -60,
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background:
                                i % 3 === 0
                                    ? "var(--color-success)"
                                    : i % 3 === 1
                                        ? "var(--color-accent-primary)"
                                        : "#f59e0b",
                        }}
                    />
                ))}
            </div>

            {/* Reset */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
            >
                <button className="btn-ghost" onClick={onReset}>
                    ✦ Compose another
                </button>
            </motion.div>
        </motion.div>
    );
}
