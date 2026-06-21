// Static file server for Playwright E2E tests.
// Handles Next.js basePath (/Tony-portfolio/) by stripping the prefix
// so serve locates files from the static export root (./out/).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../out");
const PORT = 3000;
const BASE = "/Tony-portfolio";

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    let urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname;

    // Strip /Tony-portfolio prefix so files resolve from ./out/
    if (urlPath.startsWith(BASE)) {
      urlPath = urlPath.slice(BASE.length) || "/";
    }

    // Default to index.html for directory requests
    if (urlPath.endsWith("/")) urlPath += "index.html";

    const filePath = path.join(OUT, urlPath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Serve 404.html for unknown routes
        fs.readFile(path.join(OUT, "404.html"), (_err2, data2) => {
          if (_err2) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not found");
            return;
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data2);
        });
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`Serving ./out via basePath rewrite at :${PORT}${BASE}/`);
    console.log(`listening on :${PORT}`);
  });
