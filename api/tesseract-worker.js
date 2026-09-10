const WORKER_URL = 'https://cdn.jsdelivr.net/npm/tesseract.js@v7.0.0/dist/worker.min.js';

module.exports = async function handler(req, res) {
  try {
    const upstream = await fetch(WORKER_URL, {
      headers: { 'user-agent': 'GestPro-Mobile-OCR-Worker/1.0' }
    });
    if (!upstream.ok) {
      return res.status(upstream.status).send(`OCR worker error: ${upstream.status}`);
    }
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    return res.status(200).send(await upstream.text());
  } catch (error) {
    return res.status(500).send(`OCR worker proxy error: ${error?.message || error}`);
  }
};
