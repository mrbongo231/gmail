import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();
        const expected = process.env.AUTH_PASSWORD;

        if (!expected) {
            return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
        }

        if (password !== expected) {
            return NextResponse.json({ error: "Wrong password" }, { status: 401 });
        }

        const response = NextResponse.json({ success: true });
        response.cookies.set("luminary_auth", expected, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        return response;
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
