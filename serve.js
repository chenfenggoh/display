#!/usr/bin/env node
// NTU Smart Display — local server
// Serves the display at http://127.0.0.1:8888
// Run: node serve.js   (or double-click start.command / start.bat)

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT     = 8888;
const ROOT     = __dirname;
const MAIN_APP = path.join(ROOT, 'smart-display-ntu.html');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  // Allow Spotify + gov APIs; unsafe-inline needed for the single-file HTML app
  'Content-Security-Policy': [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:",
    "connect-src 'self' https://accounts.spotify.com https://api.spotify.com https://api.data.gov.sg https://arrivelah2.busrouter.sg",
    "img-src 'self' data: blob: https://*.scdn.co https://*.spotifycdn.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
  ].join('; '),
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // Root path AND any unrecognised path → serve main app
  // This handles the Spotify OAuth redirect back to http://127.0.0.1:8888/?code=...
  if (urlPath === '/' || urlPath === '') {
    fs.readFile(MAIN_APP, (err, data) => {
      if (err) { res.writeHead(500); res.end('Could not read smart-display-ntu.html'); return; }
      res.writeHead(200, { ...HEADERS, 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  const filePath = path.join(ROOT, urlPath);
  const ext      = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Unknown path → serve main app (safe fallback)
      fs.readFile(MAIN_APP, (err2, data2) => {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { ...HEADERS, 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, { ...HEADERS, 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  const appUrl     = `http://127.0.0.1:${PORT}/smart-display-ntu.html`;
  const redirectUri = `http://127.0.0.1:${PORT}/`;
  console.log(`\n✅  NTU Smart Display is running!\n`);
  console.log(`    Open this in your browser:\n    ${appUrl}\n`);
  console.log(`    Spotify Redirect URI (paste this in developer.spotify.com):\n    ${redirectUri}\n`);
  console.log('    Press Ctrl+C to stop.\n');

  // Auto-open browser
  const open = process.platform === 'darwin' ? 'open'
             : process.platform === 'win32'  ? 'start'
             : 'xdg-open';
  require('child_process').exec(`${open} ${appUrl}`, () => {});
});
