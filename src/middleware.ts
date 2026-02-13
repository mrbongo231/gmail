import { NextRequest, NextResponse } from "next/server";

const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "";

export function middleware(req: NextRequest) {
    // If no password configured, allow everything (local dev)
    if (!AUTH_PASSWORD) {
        return NextResponse.next();
    }

    // Skip auth for API routes and static assets
    if (
        req.nextUrl.pathname.startsWith("/api/") ||
        req.nextUrl.pathname.startsWith("/_next/")
    ) {
        return NextResponse.next();
    }

    // Check for valid auth cookie
    const authCookie = req.cookies.get("luminary_auth")?.value;
    if (authCookie === "authenticated") {
        return NextResponse.next();
    }

    // Handle login form POST
    if (req.method === "POST" && req.nextUrl.pathname === "/") {
        return NextResponse.next();
    }

    // Check password in query param
    const password = req.nextUrl.searchParams.get("p");
    if (password && password === AUTH_PASSWORD) {
        const url = req.nextUrl.clone();
        url.searchParams.delete("p");
        url.pathname = "/";
        const response = NextResponse.redirect(url);
        response.cookies.set("luminary_auth", "authenticated", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        return response;
    }

    // Return login page
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Luminary</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#09090b;color:#f0f0f5;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif}
.c{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:40px;width:100%;max-width:380px;text-align:center;backdrop-filter:blur(20px)}
h1{font-size:22px;font-weight:600;margin-bottom:8px;letter-spacing:-.02em}
p{font-size:13px;color:#8a8a9a;margin-bottom:28px}
input{width:100%;padding:12px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#f0f0f5;font-size:14px;outline:none;margin-bottom:14px}
input:focus{border-color:rgba(99,102,241,.5)}
button{width:100%;padding:12px;background:linear-gradient(135deg,#6366f1,#4f46e5);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:500;cursor:pointer}
button:hover{opacity:.9}
</style>
</head>
<body>
<div class="c">
<h1>Luminary</h1>
<p>Enter your password to continue</p>
<form id="f">
<input type="password" id="pw" placeholder="Password" autofocus/>
<button type="submit">Continue</button>
</form>
</div>
<script>
document.getElementById('f').onsubmit=function(e){
e.preventDefault();
var pw=document.getElementById('pw').value;
if(pw)window.location.href='/?p='+encodeURIComponent(pw);
};
</script>
</body>
</html>`;

    return new NextResponse(html, {
        status: 401,
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
