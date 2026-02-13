"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ComposeFormProps {
    onDraftGenerated: (data: {
        recipient: string;
        subject: string;
        body: string;
    }) => void;
    onBack: () => void;
}

export default function ComposeForm({ onDraftGenerated, onBack }: ComposeFormProps) {
    const [recipient, setRecipient] = useState("");
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/generate-draft", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipient: recipient.trim(), topic: topic.trim() }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to generate draft.");
            }

            onDraftGenerated({
                recipient: recipient.trim(),
                subject: data.subject,
                body: data.body,
            });
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: "100%", maxWidth: 520 }}
        >
            {/* Header */}
            <div style={{ marginBottom: 36 }}>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={onBack}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "none",
                        border: "none",
                        color: "var(--color-text-tertiary)",
                        fontSize: 13,
                        cursor: "pointer",
                        marginBottom: 24,
                        padding: 0,
                        fontFamily: "inherit",
                    }}
                >
                    ← Back
                </motion.button>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    style={{
                        fontSize: 28,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        marginBottom: 8,
                    }}
                >
                    New email
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    style={{
                        fontSize: 14,
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.5,
                    }}
                >
                    Tell us who and what. We handle the rest.
                </motion.p>
            </div>

            {/* Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="glass-panel"
                style={{ padding: 28 }}
            >
                <div style={{ marginBottom: 20 }}>
                    <label
                        style={{
                            display: "block",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--color-text-secondary)",
                            marginBottom: 8,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                        }}
                    >
                        To
                    </label>
                    <input
                        type="email"
                        className="input-field"
                        placeholder="name@company.com"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label
                        style={{
                            display: "block",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--color-text-secondary)",
                            marginBottom: 8,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                        }}
                    >
                        What&apos;s it about?
                    </label>
                    <textarea
                        className="input-field"
                        placeholder="Follow up on our meeting, propose next steps for the partnership..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        disabled={loading}
                        rows={3}
                        style={{ resize: "vertical", minHeight: 80 }}
                    />
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        style={{
                            padding: "12px 16px",
                            marginBottom: 20,
                            borderRadius: 10,
                            background: "var(--color-error-glow)",
                            border: "1px solid rgba(248, 113, 113, 0.2)",
                            color: "var(--color-error)",
                            fontSize: 13,
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                <button
                    type="submit"
                    className="btn-glow"
                    disabled={loading || !recipient.trim() || !topic.trim()}
                    style={{ width: "100%" }}
                >
                    {loading ? (
                        <>
                            <div className="spinner" />
                            <span>Drafting…</span>
                        </>
                    ) : (
                        <>
                            <span>Generate Draft</span>
                            <span style={{ fontSize: 16, opacity: 0.7 }}>⌘↵</span>
                        </>
                    )}
                </button>
            </motion.form>
        </motion.div>
    );
}
