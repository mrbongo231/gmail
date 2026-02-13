"use client";

import { motion } from "framer-motion";
import DraggableCard from "./DraggableCard";
import MouseGradient from "./MouseGradient";

interface LandingPageProps {
    onStart: () => void;
}

const CARDS = [
    {
        icon: "⚡",
        title: "Instant Drafts",
        description: "Describe the topic. Get a polished email in seconds.",
        initialX: -480,
        initialY: -180,
        delay: 0.6,
    },
    {
        icon: "✉️",
        title: "Gmail Connected",
        description: "Sends directly from your account. No copy-paste.",
        initialX: 300,
        initialY: -160,
        delay: 0.8,
    },
    {
        icon: "✎",
        title: "Edit Before Send",
        description: "Review and refine every draft before it goes out.",
        initialX: -460,
        initialY: 100,
        delay: 1.0,
    },
    {
        icon: "→",
        title: "One Click Send",
        description: "Hit send. Done. Move on to what matters.",
        initialX: 320,
        initialY: 120,
        delay: 1.2,
    },
];

export default function LandingPage({ onStart }: LandingPageProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <MouseGradient />

            {/* Orbital Rings */}
            <div className="orbital-container">
                <div className="orbital-ring orbital-ring-1" />
                <div className="orbital-ring orbital-ring-2" />
                <div className="orbital-ring orbital-ring-3" />
            </div>

            {/* Draggable Cards — positioned from the center of the viewport */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 0,
                    height: 0,
                    zIndex: 5,
                }}
            >
                {CARDS.map((card) => (
                    <DraggableCard key={card.title} {...card} />
                ))}
            </div>

            {/* Center Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    textAlign: "center",
                    maxWidth: 520,
                    padding: "0 24px",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 24,
                            padding: "8px 16px",
                            borderRadius: 100,
                            background: "rgba(99, 102, 241, 0.08)",
                            border: "1px solid rgba(99, 102, 241, 0.15)",
                        }}
                    >
                        <div
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "#34d399",
                                boxShadow: "0 0 8px rgba(52, 211, 153, 0.5)",
                            }}
                        />
                        <span
                            style={{
                                fontSize: 12,
                                fontWeight: 500,
                                color: "var(--color-text-secondary)",
                                letterSpacing: "0.04em",
                            }}
                        >
                            Ready to compose
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                        fontSize: "clamp(36px, 5vw, 56px)",
                        fontWeight: 700,
                        letterSpacing: "-0.035em",
                        lineHeight: 1.1,
                        marginBottom: 18,
                    }}
                >
                    Email that{" "}
                    <span
                        style={{
                            background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        writes itself
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    style={{
                        fontSize: "clamp(15px, 2vw, 17px)",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                        maxWidth: 420,
                        margin: "0 auto 40px",
                    }}
                >
                    Describe what you need. Get a polished email. Send it with one click.
                    <br />
                    <span style={{ color: "var(--color-text-tertiary)" }}>
                        Drag the cards around — go ahead, play.
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                >
                    <button
                        className="btn-glow"
                        onClick={onStart}
                        style={{
                            padding: "14px 36px",
                            fontSize: 15,
                            fontWeight: 500,
                            letterSpacing: "0.01em",
                        }}
                    >
                        <span>Start Composing</span>
                        <span style={{ fontSize: 18 }}>→</span>
                    </button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    style={{
                        marginTop: 24,
                        fontSize: 11,
                        color: "var(--color-text-tertiary)",
                        letterSpacing: "0.02em",
                    }}
                >
                    Powered by Grok · Sent via Gmail
                </motion.p>
            </div>
        </motion.div>
    );
}
