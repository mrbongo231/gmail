import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Luminary — AI Email Agent",
    description:
        "Compose brilliant emails in seconds. AI-powered drafting with seamless Gmail integration.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                {children}
            </body>
        </html>
    );
}
