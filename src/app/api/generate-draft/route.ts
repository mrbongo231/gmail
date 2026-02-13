import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.XAI_API_KEY?.trim();
        if (!apiKey) {
            return NextResponse.json(
                { error: "xAI API key is not configured." },
                { status: 500 }
            );
        }

        const client = new OpenAI({
            apiKey,
            baseURL: "https://api.groq.com/openai/v1",
        });
        const body = await req.json();
        const { recipient, topic } = body;

        if (!recipient || !topic) {
            return NextResponse.json(
                { error: "Both recipient and topic are required." },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(recipient)) {
            return NextResponse.json(
                { error: "Invalid email address format." },
                { status: 400 }
            );
        }

        // Header injection protection
        if (/[\r\n]/.test(recipient) || /[\r\n]/.test(topic)) {
            return NextResponse.json(
                { error: "Invalid characters detected in input." },
                { status: 400 }
            );
        }

        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            messages: [
                {
                    role: "system",
                    content: `You are an expert email copywriter. Write professional, concise, and engaging emails. 
Return your response as valid JSON with exactly two fields:
- "subject": A clear, compelling email subject line
- "body": The full email body text (plain text, no HTML). Use proper paragraph breaks. Do NOT include a "Subject:" prefix in the body.

The tone should be professional yet approachable. Keep it concise — no fluff.`,
                },
                {
                    role: "user",
                    content: `Write an email to ${recipient} about the following topic: ${topic}`,
                },
            ],
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            return NextResponse.json(
                { error: "Failed to generate email draft." },
                { status: 500 }
            );
        }

        const draft = JSON.parse(content);

        return NextResponse.json({
            subject: draft.subject,
            body: draft.body,
        });
    } catch (error: unknown) {
        console.error("Generate draft error:", error);

        if (error instanceof OpenAI.APIError) {
            return NextResponse.json(
                { error: `Grok API error: ${error.message}` },
                { status: error.status || 500 }
            );
        }

        return NextResponse.json(
            { error: "An unexpected error occurred while generating the draft." },
            { status: 500 }
        );
    }
}
