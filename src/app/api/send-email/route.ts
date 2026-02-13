import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { recipient, subject, emailBody } = body;

        if (!recipient || !subject || !emailBody) {
            return NextResponse.json(
                { error: "Recipient, subject, and email body are all required." },
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
        if (/[\r\n]/.test(recipient) || /[\r\n]/.test(subject)) {
            return NextResponse.json(
                { error: "Invalid characters detected in input." },
                { status: 400 }
            );
        }

        // Validate environment variables
        const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
        const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim();

        if (!clientId || !clientSecret || !refreshToken) {
            return NextResponse.json(
                { error: "Gmail API credentials are not configured." },
                { status: 500 }
            );
        }

        // Create OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({ refresh_token: refreshToken });

        const gmail = google.gmail({ version: "v1", auth: oauth2Client });

        // Build RFC 2822 compliant email
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
        const messageParts = [
            `To: ${recipient}`,
            `Subject: ${utf8Subject}`,
            "MIME-Version: 1.0",
            'Content-Type: text/plain; charset="UTF-8"',
            "Content-Transfer-Encoding: 7bit",
            "",
            emailBody,
        ];
        const message = messageParts.join("\r\n");

        // Base64 URL-safe encode
        const encodedMessage = Buffer.from(message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        const result = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage,
            },
        });

        return NextResponse.json({
            success: true,
            messageId: result.data.id,
        });
    } catch (error: unknown) {
        console.error("Send email error:", error);

        const message =
            error instanceof Error ? error.message : "An unexpected error occurred.";

        return NextResponse.json(
            { error: `Failed to send email: ${message}` },
            { status: 500 }
        );
    }
}
