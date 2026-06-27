export const RESUME_BASE_CSS = `/* A4 page reset at 96 DPI — 794×1123px canvas for preview and PDF export */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  width: 794px;
  min-height: 1123px;
  margin: 0;
  padding: 0;
  background: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  color: #111827;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

body {
  padding: 40px 48px;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  color: inherit;
}

ul,
ol {
  list-style-position: outside;
}

table {
  border-collapse: collapse;
  width: 100%;
}

@media print {
  html,
  body {
    width: 210mm;
    min-height: 297mm;
  }
}`;
