"use client";

import { useState } from "react";
import { Copy, Check, Bot, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ALLOWED_TAGS, BLOCKED_TAGS } from "@/lib/sanitize";

const AI_PROMPT = `You are generating HTML + CSS for a resume editor. Follow these rules exactly:

CANVAS: 794px × 1123px (A4 at 96 DPI). Body padding: 40px top/bottom, 48px left/right. Content area: ~698px × 1043px. Design to fit one page.

ALLOWED TAGS: div, span, section, header, footer, article, main, nav, aside, p, h1-h6, br, hr, strong, b, em, i, small, sub, sup, blockquote, cite, abbr, time, mark, ul, ol, li, dl, dt, dd, a, table, thead, tbody, tfoot, tr, th, td, caption, colgroup, col, img.

BLOCKED (will error): script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset, applet.

CSS: Full CSS allowed. Avoid position:fixed. Use flexbox/grid for layout. Fonts: 'Roboto' and 'Inter' are pre-loaded. Font Awesome 6 icons available via <i class="fa-solid fa-envelope"></i>.

ASSETS: Uploaded images are referenced by filename only: <img src="photo.png" alt="...">

LINKS: <a href="mailto:..."> and <a href="https://..." target="_blank"> are preserved in PDF export.

ATS RULES: Use real h1/h2 headings. No text in images. Layout must follow DOM reading order (no absolute columns). Section order: contact → summary → experience → education → skills.

OUTPUT: Return only the HTML body content (no <html>/<head>/<body> tags) and separate CSS. Do not include <style> tags in HTML.`;

const AI_PROMPT_LABEL = "AI Prompt copied!";

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="overflow-x-auto rounded-lg border border-border bg-secondary p-4 text-xs font-mono text-secondary-foreground leading-relaxed">
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] bg-muted text-muted-foreground hover:bg-muted/80 border border-border"
      >
        {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function SectionHeading({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground shrink-0">
        {num}
      </span>
      {children}
    </h2>
  );
}

const ALLOWED_ELEMENTS: { tag: string; description: string; example: string }[] = [
  { tag: "div, span", description: "Generic containers and inline wrappers", example: '<div class="entry"><span>2024</span></div>' },
  { tag: "section, header, footer", description: "Semantic page sections", example: "<section><h2>Experience</h2></section>" },
  { tag: "article, main, nav, aside", description: "Additional semantic landmarks", example: '<header class="resume-header">...</header>' },
  { tag: "p", description: "Paragraph text", example: '<p class="tagline">Full Stack Developer</p>' },
  { tag: "h1–h6", description: "Headings (use h1 once for name)", example: "<h1>Jane Doe</h1><h2>Skills</h2>" },
  { tag: "br, hr", description: "Line break and horizontal rule", example: "<hr />" },
  { tag: "strong, b, em, i", description: "Bold, emphasis, and icons (via Font Awesome on <i>)", example: "<strong>Senior Developer</strong>" },
  { tag: "small, sub, sup", description: "Smaller or positioned text", example: "<small>Remote</small>" },
  { tag: "blockquote, cite", description: "Quoted text and citations", example: "<blockquote>Great collaborator.</blockquote>" },
  { tag: "abbr, time, mark", description: "Abbreviations, dates, highlighted text", example: "<time>2021 – Present</time>" },
  { tag: "ul, ol, li", description: "Bullet and numbered lists", example: "<ul><li>Built APIs</li></ul>" },
  { tag: "dl, dt, dd", description: "Definition lists", example: "<dl><dt>Python</dt><dd>Expert</dd></dl>" },
  { tag: "a", description: "Hyperlinks (email, web, LinkedIn, etc.)", example: '<a href="mailto:jane@example.com">Email</a>' },
  { tag: "table, thead, tbody, tfoot", description: "Tabular data structures", example: "<table><thead><tr><th>Skill</th></tr></thead></table>" },
  { tag: "tr, th, td", description: "Table rows and cells", example: "<tr><td>TypeScript</td><td>Expert</td></tr>" },
  { tag: "caption, colgroup, col", description: "Table captions and column groups", example: "<caption>Publications</caption>" },
  { tag: "img", description: "Images (uploads, https, or data URIs)", example: '<img src="photo.png" alt="Photo" />' },
];

export default function RulebookContent() {
  const [aiCopied, setAiCopied] = useState(false);
  const blockedEntries = Object.entries(BLOCKED_TAGS);

  const handleAiCopy = () => {
    navigator.clipboard.writeText(AI_PROMPT);
    setAiCopied(true);
    toast.success(AI_PROMPT_LABEL);
    setTimeout(() => setAiCopied(false), 2500);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-foreground space-y-12">

      {/* AI Guide */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold tracking-tight text-foreground">AI Prompt Guide</h2>
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Copy & paste into any AI</span>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">
          Use this prompt to instruct any AI assistant (ChatGPT, Claude, Gemini…) to generate valid resume HTML + CSS for this editor. It includes all constraints, dimensions, and rules.
        </p>
        <div className="relative">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-primary/30 bg-primary/5 p-5 text-xs font-mono leading-relaxed text-foreground">
            {AI_PROMPT}
          </pre>
          <Button
            size="sm"
            variant={aiCopied ? "secondary" : "default"}
            className="absolute top-3 right-3 h-7 gap-1.5 text-xs"
            onClick={handleAiCopy}
          >
            {aiCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {aiCopied ? "Copied!" : "Copy Prompt"}
          </Button>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Rulebook Header */}
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-base font-semibold tracking-tight text-foreground">Full Rulebook Reference</h2>
      </div>

      {/* 1. Allowed HTML */}
      <section>
        <SectionHeading num="1">Allowed HTML Elements</SectionHeading>
        <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground">Tag</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground">Description</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground hidden md:table-cell">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ALLOWED_ELEMENTS.map((row) => (
                <tr key={row.tag} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs font-medium text-primary">{row.tag}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.description}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground/70 hidden md:table-cell">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Blocked HTML */}
      <section>
        <SectionHeading num="2">Blocked HTML Elements</SectionHeading>
        <p className="mb-4 text-sm text-muted-foreground">These tags are rejected at compile time and will show a descriptive error.</p>
        <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground">Tag</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blockedEntries.map(([tag, reason]) => (
                <tr key={tag} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs font-medium text-destructive">&lt;{tag}&gt;</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. CSS */}
      <section>
        <SectionHeading num="3">CSS Usage</SectionHeading>
        <p className="mb-3 text-sm text-muted-foreground">
          Full CSS is allowed in the CSS pane. Use classes and IDs from your HTML for styling. Inline <code className="rounded bg-muted px-1.5 py-0.5 text-xs">style</code> attributes are also permitted.
        </p>
        <div className="mb-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <strong className="text-foreground">⚠ PDF caveat:</strong> Avoid <code className="rounded bg-muted px-1.5 py-0.5 text-xs">position: fixed</code>. Fixed elements may not render consistently in PDF export. Prefer flexbox or grid.
        </div>
        <CodeBlock>{`.entry-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}`}</CodeBlock>
      </section>

      {/* 4. Icons */}
      <section>
        <SectionHeading num="4">Icons (Font Awesome 6)</SectionHeading>
        <p className="mb-3 text-sm text-muted-foreground">
          Font Awesome 6 is pre-loaded. Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">&lt;i&gt;</code> tags with Font Awesome class names. No imports or CSS wrappers are required.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CodeBlock>{`<i class="fa-solid fa-envelope"></i> Email
<i class="fa-solid fa-phone"></i> Phone
<i class="fa-solid fa-location-dot"></i> Location
<i class="fa-brands fa-linkedin"></i> LinkedIn
<i class="fa-brands fa-github"></i> GitHub
<i class="fa-solid fa-globe"></i> Portfolio
<i class="fa-solid fa-calendar"></i> Calendar`}</CodeBlock>
          <div className="flex flex-col gap-2.5 p-5 rounded-lg border border-border bg-card justify-center">
            <span className="text-xs font-semibold text-muted-foreground mb-1">Live Icon Preview:</span>
            <div className="grid grid-cols-2 gap-2 text-sm text-foreground">
              <div className="flex items-center gap-2"><i className="fa-solid fa-envelope text-primary w-4"></i> Email</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-phone text-primary w-4"></i> Phone</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-primary w-4"></i> Location</div>
              <div className="flex items-center gap-2"><i className="fa-brands fa-linkedin text-primary w-4"></i> LinkedIn</div>
              <div className="flex items-center gap-2"><i className="fa-brands fa-github text-primary w-4"></i> GitHub</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-globe text-primary w-4"></i> Portfolio</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-calendar text-primary w-4"></i> Calendar</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hyperlinks */}
      <section>
        <SectionHeading num="5">Hyperlinks</SectionHeading>
        <p className="mb-3 text-sm text-muted-foreground">
          Standard <code className="rounded bg-muted px-1.5 py-0.5 text-xs">&lt;a href=&quot;...&quot;&gt;</code> links are supported. <code className="rounded bg-muted px-1.5 py-0.5 text-xs">target=&quot;_blank&quot;</code> is allowed. Links remain clickable in the exported PDF.
        </p>
        <CodeBlock>{`<a href="mailto:jane@example.com">jane@example.com</a>
<a href="https://linkedin.com/in/janedoe" target="_blank" rel="noopener noreferrer">
  linkedin.com/in/janedoe
</a>`}</CodeBlock>
      </section>

      {/* 6. Images */}
      <section>
        <SectionHeading num="6">Images &amp; Assets</SectionHeading>
        <p className="mb-3 text-sm text-muted-foreground">
          Upload images in the <strong>Assets</strong> tab. Reference by filename only — no path needed. <code className="rounded bg-muted px-1.5 py-0.5 text-xs">https://</code> and <code className="rounded bg-muted px-1.5 py-0.5 text-xs">data:</code> URIs are also allowed.
        </p>
        <CodeBlock>{`<!-- Uploaded asset: just use the filename -->
<img src="photo.png" alt="Jane Doe" width="80" height="80" class="profile-photo" />

<!-- External HTTPS image -->
<img src="https://example.com/photo.jpg" alt="Jane Doe" />`}</CodeBlock>
      </section>

      {/* 7. A4 Dimensions */}
      <section>
        <SectionHeading num="7">A4 Dimensions</SectionHeading>
        <p className="mb-3 text-sm text-muted-foreground">
          The preview canvas and PDF are standard A4 at 96 DPI: <strong className="text-foreground">794px × 1123px</strong>. Default body padding is 40px top/bottom and 48px left/right — giving a content area of ~698px × 1043px.
        </p>
        <CodeBlock>{`/* Canvas: 794 × 1123 px
   Content area (after default padding): ~698 × 1043 px */

body {
  padding: 40px 48px; /* default — override as needed */
}`}</CodeBlock>
      </section>

      {/* 8. Typography */}
      <section>
        <SectionHeading num="8">Typography</SectionHeading>
        <p className="mb-3 text-sm text-muted-foreground">
          Roboto and Inter are loaded from Google Fonts automatically. Reference them in your CSS:
        </p>
        <CodeBlock>{`body { font-family: 'Roboto', sans-serif; }
.tagline { font-family: 'Inter', sans-serif; font-size: 15px; }

/* Recommended scale */
h1 { font-size: 28px; }
h2 { font-size: 16px; }
body, li { font-size: 13px; }
small { font-size: 11px; }`}</CodeBlock>
      </section>

      {/* 9. Tables */}
      <section>
        <SectionHeading num="9">Tables</SectionHeading>
        <p className="mb-3 text-sm text-muted-foreground">
          Tables work well for skills grids, publication lists, or certification matrices. Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">&lt;th&gt;</code> cells for ATS readability.
        </p>
        <CodeBlock>{`<table>
  <thead>
    <tr><th>Skill</th><th>Level</th></tr>
  </thead>
  <tbody>
    <tr><td>TypeScript</td><td>Expert</td></tr>
    <tr><td>React</td><td>Advanced</td></tr>
  </tbody>
</table>`}</CodeBlock>
      </section>

      {/* 10. ATS Tips */}
      <section>
        <SectionHeading num="10">ATS Tips</SectionHeading>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          {[
            "Do not use absolute positioning for multi-column layouts — ATS parsers read linear DOM order.",
            "Use flexbox or grid with a logical DOM order that matches visual reading order.",
            "Never put essential text inside images — parsers cannot read image content.",
            <>Use real headings (<code className="rounded bg-muted px-1.5 py-0.5 text-xs">h1</code>, <code className="rounded bg-muted px-1.5 py-0.5 text-xs">h2</code>) for section titles, not styled <code className="rounded bg-muted px-1.5 py-0.5 text-xs">div</code>s.</>,
            "Include full URLs in link text or nearby text for clarity.",
            "Keep section order conventional: contact → summary → experience → education → skills.",
          ].map((tip, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-0.5 h-4 w-4 shrink-0 text-primary">✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
