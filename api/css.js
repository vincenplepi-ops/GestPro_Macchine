const ORIGINAL_CSS = "https://gestpro-macchine-mobile.plepivincens.chatgpt.site/_next/static/css/index.C0m4IbVE.css";

const WALLPAPER_CSS = `
/* VP Software wallpaper - GestPro Mobile */
html, body {
  min-height: 100%;
  background-color: #031027 !important;
  background-image: url('/api/wallpaper') !important;
  background-position: center center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
}
body {
  position: relative;
}
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: rgba(2, 11, 28, .18);
  z-index: 0;
}
.app-shell {
  position: relative;
  z-index: 1;
  background: rgba(4, 19, 39, .38) !important;
  backdrop-filter: blur(1px) saturate(115%);
  -webkit-backdrop-filter: blur(1px) saturate(115%);
}
.login-page,
.detail-page,
.home-page {
  position: relative;
  z-index: 1;
  background: transparent !important;
}
.login-card,
.scan-analysis,
.verify-card,
.scan-preview,
.extra-card,
.machine-card,
.status-card,
.capture-card,
.section-card,
header {
  background-color: rgba(6, 27, 50, .76) !important;
  backdrop-filter: blur(5px) saturate(120%);
  -webkit-backdrop-filter: blur(5px) saturate(120%);
}
@media (max-width: 720px) {
  html, body {
    background-attachment: scroll !important;
    background-position: center top !important;
  }
  .app-shell {
    background: rgba(4, 19, 39, .32) !important;
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
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('X-GestPro-Wallpaper', 'vp-visible-v2');
    res.status(200).send(css + '\n' + WALLPAPER_CSS);
  } catch (error) {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.status(200).send(WALLPAPER_CSS);
  }
}
