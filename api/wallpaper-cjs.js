const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  try {
    const source = fs.readFileSync(path.join(__dirname, 'wallpaper.js'), 'utf8');
    const match = source.match(/const WALLPAPER = \"([^\"]+)\";/);
    if (!match) throw new Error('Wallpaper data not found');
    const image = Buffer.from(match[1], 'base64');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).send(image);
  } catch (error) {
    res.status(500).send('Wallpaper error');
  }
};
