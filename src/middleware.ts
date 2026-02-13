import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

    // No password set — allow access (local dev)
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
    if (authCookie === AUTH_PASSWORD) {
        return NextResponse.next();
    }

    // Return login page
    return new NextResponse(LOGIN_HTML, {
        status: 401,
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}

const LOGIN_HTML = `<!DOCTYPE html>
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
input{width:100%;padding:12px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#f0f0f5;font-size:14px;outline:none;margin-bottom:14px;font-family:inherit}
input:focus{border-color:rgba(99,102,241,.5)}
button{width:100%;padding:12px;background:linear-gradient(135deg,#6366f1,#4f46e5);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit}
button:hover{opacity:.9}
button:disabled{opacity:.5;cursor:not-allowed}
.err{color:#f87171;font-size:12px;margin-top:12px;display:none}
</style>
</head>
<body>
<div class="c">
<h1>Luminary</h1>
<p>Enter your password to continue</p>
<form id="f">
<input type="password" id="pw" placeholder="Password" autofocus/>
<button type="submit" id="btn">Continue</button>
</form>
<div class="err" id="err"></div>
</div>
<script>
document.getElementById('f').onsubmit=async function(e){
  e.preventDefault();
  var pw=document.getElementById('pw').value;
  if(!pw)return;
  var btn=document.getElementById('btn');
  var err=document.getElementById('err');
  btn.disabled=true;
  btn.textContent='Checking...';
  err.style.display='none';
  try{
    var r=await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})});
    if(r.ok){window.location.href='/';}
    else{var d=await r.json();err.textContent=d.error||'Wrong password';err.style.display='block';}
  }catch(x){err.textContent='Something went wrong';err.style.display='block';}
  btn.disabled=false;
  btn.textContent='Continue';
};
</script>
</body>
</html>`;

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
