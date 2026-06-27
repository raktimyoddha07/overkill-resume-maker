import path from "path";
import fs from "fs";

export function getUploadsDir(): string {
  const envPath = process.env.UPLOADS_DIR;
  if (envPath) {
    if (path.isAbsolute(envPath)) {
      return envPath;
    }
    return path.join(process.cwd(), envPath);
  }
  return path.join(process.cwd(), "uploads");
}

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp",
  ".ico": "image/x-icon",
  ".tiff": "image/tiff",
  ".avif": "image/avif",
};

/**
 * Replaces all src attributes that reference uploaded filenames with
 * base64-encoded data URIs so Puppeteer can embed them when rendering
 * the PDF (Puppeteer's setContent has no host to resolve relative URLs).
 */
export function inlineUploadsAsBase64(html: string): string {
  const uploadsDir = getUploadsDir();
  // Match src="filename.ext" or src='filename.ext' — bare filename only
  return html.replace(/src=["']([^"'\/\\:?#]+\.[a-zA-Z]{2,6})["']/g, (match, filename) => {
    const safeFilename = path.basename(filename);
    const filePath = path.join(uploadsDir, safeFilename);
    if (!fs.existsSync(filePath)) return match;
    try {
      const ext = path.extname(safeFilename).toLowerCase();
      const mime = MIME_TYPES[ext] || "image/png";
      const data = fs.readFileSync(filePath).toString("base64");
      return `src="data:${mime};base64,${data}"`;
    } catch {
      return match;
    }
  });
}
