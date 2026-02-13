import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

    // If no password is set, allow access (local dev)
    if (!AUTH_PASSWORD) {
        return NextResponse.next();
    }

    // Skip auth for API routes (they have their own validation)
    if (req.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    // Check for auth cookie
    const authCookie = req.cookies.get("luminary_auth");
    if (authCookie?.value === AUTH_PASSWORD) {
        return NextResponse.next();
    }

    // Check if this is a login attempt
    if (req.nextUrl.pathname === "/login" && req.method === "POST") {
        return NextResponse.next();
    }

    // Check for password in query param (simple login flow)
    const password = req.nextUrl.searchParams.get("password");
    if (password === AUTH_PASSWORD) {
        const response = NextResponse.redirect(new URL("/", req.url));
        response.cookies.set("luminary_auth", AUTH_PASSWORD, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
        return response;
    }

    // Show login page
    return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luminary — Login</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #09090b;
            color: #f0f0f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
        }
        .card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 380px;
            text-align: center;
            backdrop-filter: blur(20px);
        }
        h1 { font-size: 22px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.02em; }
        p { font-size: 13px; color: #8a8a9a; margin-bottom: 28px; }
        form { display: flex; flex-direction: column; gap: 14px; }
        input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px;
            color: #f0f0f5;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
        }
        input:focus { border-color: rgba(99,102,241,0.5); }
        button {
            padding: 12px;
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        button:hover { opacity: 0.9; }
        .error { color: #f87171; font-size: 12px; margin-top: 8px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Luminary</h1>
        <p>Enter your password to continue</p>
        <form onsubmit="login(event)">
            <input type="password" id="pw" placeholder="Password" autofocus />
            <button type="submit">Continue</button>
        </form>
        <div id="err" class="error"></div>
    </div>
    <script>
        function login(e) {
            e.preventDefault();
            const pw = document.getElementById('pw').value;
            if (!pw) return;
            window.location.href = '/?password=' + encodeURIComponent(pw);
        }
    </script>
</body>
</html>`,
        {
            status: 401,
            headers: { "Content-Type": "text/html" },
        }
    );
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
