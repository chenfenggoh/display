#!/usr/bin/env python3
"""NTU Smart Display — local server (Python fallback)
Serves the display at http://127.0.0.1:8888
Run: python3 serve.py   (or double-click start.command / start.bat)
"""
import http.server, socketserver, os, webbrowser, threading

PORT      = 8888
APP_URL   = f"http://127.0.0.1:{PORT}/smart-display-ntu.html"
REDIR_URI = f"http://127.0.0.1:{PORT}/"

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split('?')[0]
        if path in ('/', ''):
            self.path = '/smart-display-ntu.html'
        else:
            full = os.path.join(os.getcwd(), path.lstrip('/'))
            if not os.path.exists(full):
                self.path = '/smart-display-ntu.html'
            else:
                self.path = path
        return super().do_GET()

    def end_headers(self):
        csp = '; '.join([
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:",
            "connect-src 'self' https://accounts.spotify.com https://api.spotify.com https://api.data.gov.sg https://arrivelah2.busrouter.sg",
            "img-src 'self' data: blob: https://*.scdn.co https://*.spotifycdn.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
        ])
        self.send_header('Content-Security-Policy', csp)
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass

print(f"\n✅  NTU Smart Display is running!\n")
print(f"    Open this in your browser:\n    {APP_URL}\n")
print(f"    Spotify Redirect URI (paste this in developer.spotify.com):\n    {REDIR_URI}\n")
print("    Press Ctrl+C to stop.\n")

threading.Timer(1.0, lambda: webbrowser.open(APP_URL)).start()

with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
