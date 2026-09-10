module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    app: 'GestPro Macchine Mobile',
    scanner: 'v19-iphone-scan-safe'
  });
};
