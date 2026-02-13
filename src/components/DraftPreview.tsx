"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DraftPreviewProps {
    recipient: string;
    subject: string;
    body: string;
    onSend: (data: { recipient: string; subject: string; body: string }) => void;
    onBack: () => void;
    sending: boolean;
}

export default function DraftPreview({
    recipient,
    subject: initialSubject,
    body: initialBody,
    onSend,
    onBack,
    sending,
}: DraftPreviewProps) {
    const [subject, setSubject] = useState(initialSubject);
    const [body, setBody] = useState(initialBody);
    const [isEditing, setIsEditing] = useState(false);

    const handleSend = () => {
        onSend({ recipient, subject, body });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: "100%", maxWidth: 620 }}
        >
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12,
                    }}
                >
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--color-accent-primary)",
                        }}
                        className="pulse-glow"
                    />
                    <span
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "var(--color-accent-primary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                        }}
                    >
                        AI Draft Ready
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    style={{
                        fontSize: 26,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        marginBottom: 6,
                    }}
                >
                    Review your email
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    style={{
                        fontSize: 14,
                        color: "var(--color-text-secondary)",
                    }}
                >
                    Edit anything below before sending.
                </motion.p>
            </div>

            {/* Draft Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="glass-panel-strong"
                style={{ padding: 28, marginBottom: 20 }}
            >
                {/* Recipient Row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        paddingBottom: 16,
                        marginBottom: 16,
                        borderBottom: "1px solid var(--color-border-primary)",
                    }}
                >
                    <span
                        style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--color-text-tertiary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            minWidth: 32,
                        }}
                    >
                        To
                    </span>
                    <span
                        style={{
                            fontSize: 14,
                            color: "var(--color-text-secondary)",
                            background: "rgba(124, 100, 255, 0.08)",
                            padding: "4px 12px",
                            borderRadius: 6,
                            border: "1px solid rgba(124, 100, 255, 0.15)",
                        }}
                    >
                        {recipient}
                    </span>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: 20 }}>
                    <span
                        style={{
                            display: "block",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--color-text-tertiary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 8,
                        }}
                    >
                        Subject
                    </span>
                    {isEditing ? (
                        <input
                            className="input-field"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            style={{ fontSize: 16, fontWeight: 500 }}
                        />
                    ) : (
                        <p
                            style={{
                                fontSize: 16,
                                fontWeight: 500,
                                color: "var(--color-text-primary)",
                                lineHeight: 1.4,
                            }}
                        >
                            {subject}
                        </p>
                    )}
                </div>

                {/* Body */}
                <div>
                    <span
                        style={{
                            display: "block",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--color-text-tertiary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 8,
                        }}
                    >
                        Body
                    </span>
                    {isEditing ? (
                        <textarea
                            className="draft-textarea"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={10}
                        />
                    ) : (
                        <div
                            style={{
                                fontSize: 14,
                                color: "var(--color-text-secondary)",
                                lineHeight: 1.8,
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {body}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", gap: 12 }}>
                    <button className="btn-ghost" onClick={onBack} disabled={sending}>
                        ← Back
                    </button>
                    <button
                        className="btn-ghost"
                        onClick={() => setIsEditing(!isEditing)}
                        disabled={sending}
                    >
                        {isEditing ? "✓ Done editing" : "✎ Edit"}
                    </button>
                </div>

                <button
                    className="btn-glow"
                    onClick={handleSend}
                    disabled={sending || !subject.trim() || !body.trim()}
                >
                    {sending ? (
                        <>
                            <div className="spinner" />
                            <span>Sending…</span>
                        </>
                    ) : (
                        <>
                            <span>Send Email</span>
                            <span style={{ fontSize: 16 }}>→</span>
                        </>
                    )}
                </button>
            </motion.div>
        </motion.div>
    );
}
