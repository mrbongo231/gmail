"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import ComposeForm from "@/components/ComposeForm";
import DraftPreview from "@/components/DraftPreview";
import SuccessView from "@/components/SuccessView";
import ErrorDisplay from "@/components/ErrorDisplay";

type AppState = "landing" | "compose" | "preview" | "sending" | "success" | "error";

interface DraftData {
    recipient: string;
    subject: string;
    body: string;
}

export default function Home() {
    const [state, setState] = useState<AppState>("landing");
    const [draft, setDraft] = useState<DraftData | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleDraftGenerated = (data: DraftData) => {
        setDraft(data);
        setState("preview");
    };

    const handleSend = async (data: DraftData) => {
        setState("sending");
        setDraft(data);

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recipient: data.recipient,
                    subject: data.subject,
                    emailBody: data.body,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Failed to send email.");
            }

            setState("success");
        } catch (err: unknown) {
            setErrorMessage(
                err instanceof Error ? err.message : "Something went wrong."
            );
            setState("error");
        }
    };

    const handleReset = () => {
        setDraft(null);
        setErrorMessage("");
        setState("compose");
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: state === "landing" ? 0 : "40px 24px",
            }}
        >
            <AnimatePresence mode="wait">
                {state === "landing" && (
                    <LandingPage key="landing" onStart={() => setState("compose")} />
                )}

                {state === "compose" && (
                    <ComposeForm
                        key="compose"
                        onDraftGenerated={handleDraftGenerated}
                        onBack={() => setState("landing")}
                    />
                )}

                {(state === "preview" || state === "sending") && draft && (
                    <DraftPreview
                        key="preview"
                        recipient={draft.recipient}
                        subject={draft.subject}
                        body={draft.body}
                        onSend={handleSend}
                        onBack={() => setState("compose")}
                        sending={state === "sending"}
                    />
                )}

                {state === "success" && draft && (
                    <SuccessView
                        key="success"
                        recipient={draft.recipient}
                        onReset={handleReset}
                    />
                )}

                {state === "error" && (
                    <ErrorDisplay
                        key="error"
                        message={errorMessage}
                        onRetry={() => draft && handleSend(draft)}
                        onBack={handleReset}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
