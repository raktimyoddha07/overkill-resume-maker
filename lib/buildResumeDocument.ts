import { RESUME_BASE_CSS } from "./resume-base-css";

const FONT_AWESOME_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap";

export function buildResumeDocument(sanitizedHtml: string, css: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <base href="/api/uploads/">
  <link rel="stylesheet" href="${GOOGLE_FONTS}">
  <link rel="stylesheet" href="${FONT_AWESOME_CDN}">
  <style>
${RESUME_BASE_CSS}
${css}
  </style>
</head>
<body>
${sanitizedHtml}
</body>
</html>`;
}
