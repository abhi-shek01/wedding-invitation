const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
};

http.createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = path.resolve(root, relative);
  // Serve only public invitation files, never repository or configuration tooling.
  const publicFile = ["index.html", "styles.css", "app.js", "invitation.config.js"].includes(relative)
    || (relative.startsWith("assets/") && [".png", ".jpg", ".jpeg", ".webp", ".woff2", ".mp3"].includes(path.extname(file)));
  if (!file.startsWith(root + path.sep) || !publicFile) {
    response.writeHead(404).end("Not found");
    return;
  }
  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404).end("Not found");
      return;
    }
    const headers = {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Length": data.length,
    };
    if (path.extname(file) === ".mp3") {
      headers["Accept-Ranges"] = "bytes";
      if (request.headers.range) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
        let start = range?.[1] ? Number(range[1]) : 0;
        let end = range?.[2] ? Number(range[2]) : data.length - 1;
        if (range && !range[1] && range[2]) {
          start = Math.max(0, data.length - Number(range[2]));
          end = data.length - 1;
        }
        if (!range || (!range[1] && !range[2]) || !Number.isSafeInteger(start)
          || !Number.isSafeInteger(end) || start < 0 || start >= data.length || end < start) {
          response.writeHead(416, { "Content-Range": `bytes */${data.length}` }).end();
          return;
        }
        end = Math.min(end, data.length - 1);
        response.writeHead(206, {
          ...headers, "Content-Range": `bytes ${start}-${end}/${data.length}`,
          "Content-Length": end - start + 1,
        });
        response.end(request.method === "HEAD" ? undefined : data.subarray(start, end + 1));
        return;
      }
    }
    response.writeHead(200, headers);
    response.end(request.method === "HEAD" ? undefined : data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Invitation preview: http://127.0.0.1:${port}`);
});
