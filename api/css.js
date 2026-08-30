const ORIGINAL_CSS = "https://gestpro-macchine-mobile.plepivincens.chatgpt.site/_next/static/css/index.C0m4IbVE.css";

const WALLPAPER_CSS = `
/* VP Software wallpaper - GestPro Mobile */
html, body {
  min-height: 100%;
  background: #061735 url('/api/wallpaper') center center / cover no-repeat fixed !important;
}
body {
  position: relative;
}
.app-shell {
  background: linear-gradient(180deg, rgba(6, 23, 53, .76), rgba(5, 18, 35, .84)), url('/api/wallpaper') center center / cover no-repeat fixed !important;
}
.login-page {
  background: linear-gradient(180deg, rgba(4, 16, 38, .42), rgba(4, 16, 38, .62)), url('/api/wallpaper') center center / cover no-repeat fixed !important;
}
.login-card,
.scan-analysis,
.verify-card {
  backdrop-filter: blur(2px) saturate(120%);
  -webkit-backdrop-filter: blur(2px) saturate(120%);
}
@media (max-width: 720px) {
  html, body, .app-shell, .login-page {
    background-attachment: scroll !important;
    background-position: center top !important;
  }
}
`;

export default async function handler(req, res) {
  try {
    const upstream = await fetch(ORIGINAL_CSS, {
      headers: { 'User-Agent': 'GestPro-Vercel-Proxy' }
    });
    if (!upstream.ok) {
      throw new Error(`Upstream CSS ${upstream.status}`);
    }
    const css = await upstream.text();
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, must-revalidate');
    res.status(200).send(css + '\n' + WALLPAPER_CSS);
  } catch (error) {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    res.status(200).send(WALLPAPER_CSS);
  }
}
