"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Copy, Check, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";

type Prompt = {
  id: string;
  label: string;
  badge: string;
  badgeColor: string;
  description: string;
  content: string;
};

const PROMPTS: Prompt[] = [
  {
    id: "quick",
    label: "Quick Start Prompt",
    badge: "Beginner",
    badgeColor: "bg-accent/20 text-accent-foreground border-accent/30",
    description:
      "Paste this before your resume description. Works great for a first draft in ChatGPT, Claude, or Gemini.",
    content: `You are a resume HTML/CSS generator for a specific editor. Follow these rules:

CANVAS: A4 page = 794px wide × 1123px tall at 96 DPI.
Body padding: 40px top/bottom, 48px left/right.
Content area: ~698px × 1043px. Everything must fit on ONE page.

OUTPUT FORMAT:
- Return ONLY the HTML body content (no <html>, <head>, <body>, or <style> tags).
- Return CSS separately (no <style> tags — it goes in a separate CSS pane).

HTML RULES:
- Allowed: div, span, section, header, p, h1-h6, ul, ol, li, a, strong, em, i, br, hr, table, thead, tbody, tr, th, td, img, small, time, abbr, mark, blockquote.
- Forbidden: script, style, iframe, form, input, button, link, meta, object, embed.
- Use ONE <h1> for the candidate's name. Use <h2> for section headings.
- Icons: <i class="fa-solid fa-envelope"></i> (Font Awesome 6 is pre-loaded).
- Images: <img src="photo.png" alt="..."> (filename only, no path needed).
- Links: <a href="mailto:..."> and <a href="https://..." target="_blank"> work fine.

CSS RULES:
- Use flexbox or CSS grid for layout (no position: absolute/fixed for columns).
- Fonts available: 'Roboto' and 'Inter' (pre-loaded from Google Fonts).
- Keep font sizes reasonable: h1 ≈ 26–28px, h2 ≈ 14–16px, body ≈ 12–13px.
- No page-break tricks — design to fit within the single A4 canvas.

ATS RULES:
- Text must be in real HTML text nodes, not images.
- DOM order must match visual reading order.
- Section order: contact info → summary → experience → education → skills.

Now generate a professional resume for: [DESCRIBE YOURSELF HERE]`,
  },
  {
    id: "detailed",
    label: "Detailed Technical Prompt",
    badge: "Advanced",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
    description:
      "Full specification prompt. Use this for precise, pixel-perfect control over layout and typography.",
    content: `You are an expert HTML/CSS resume generator for the Overkill Resume Maker editor.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CANVAS & DIMENSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Page: A4 at 96 DPI = 794px × 1123px
- Default body padding: 40px top/bottom, 48px left/right
- Safe content area: 698px wide × 1043px tall
- Single page only. If content overflows, reduce font sizes or tighten spacing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Return TWO blocks clearly labelled:

[HTML]
<div class="resume">
  ... body content only, no html/head/body/style tags ...
</div>

[CSS]
.resume { ... }
... all styles here, no <style> wrapper ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ALLOWED HTML TAGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
div, span, section, header, footer, article, main, nav, aside,
p, h1, h2, h3, h4, h5, h6, br, hr,
strong, b, em, i, small, sub, sup, mark, abbr, time, blockquote, cite,
ul, ol, li, dl, dt, dd,
a (href, target, rel allowed),
table, thead, tbody, tfoot, tr, th, td, caption, colgroup, col,
img (src, alt, width, height, class allowed)

FORBIDDEN (will cause compile error): script, style, iframe, object,
embed, form, input, button, link, meta, base, frame, frameset.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TYPOGRAPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pre-loaded fonts (use in CSS font-family):
  'Roboto', sans-serif
  'Inter', sans-serif

Recommended scale:
  h1 (name): 26–28px, font-weight: 700
  h2 (section): 13–15px, font-weight: 600, text-transform: uppercase, letter-spacing: 0.06em
  body / li: 12–13px
  small / dates: 11px
  line-height: 1.4–1.5

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LAYOUT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Use display: flex and display: grid for multi-column layouts.
✓ justify-content: space-between for entry headers (job title | date).
✓ CSS grid for skills chips: grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))
✗ DO NOT use position: absolute or position: fixed for layout columns.
✗ DO NOT use float-based columns.
✗ DO NOT use CSS columns (column-count) for main sections.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ICONS (Font Awesome 6)
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pre-loaded — use <i> tags with FA class names:
  <i class="fa-solid fa-envelope"></i>    Email
  <i class="fa-solid fa-phone"></i>       Phone
  <i class="fa-solid fa-location-dot"></i> Location
  <i class="fa-brands fa-linkedin"></i>   LinkedIn
  <i class="fa-brands fa-github"></i>     GitHub
  <i class="fa-solid fa-globe"></i>       Portfolio
  <i class="fa-solid fa-calendar"></i>    Dates

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  IMAGES & ASSETS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Uploaded images: reference by filename only (no path):
  <img src="headshot.png" alt="Jane Doe" width="72" height="72">
External: <img src="https://..." alt="..."> is also fine.
Profile photos: typically 60–80px circular with border-radius: 50%.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LINKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
  <a href="mailto:jane@example.com">jane@example.com</a>
  <a href="https://linkedin.com/in/jane" target="_blank" rel="noopener noreferrer">LinkedIn</a>
Links remain clickable in the exported PDF.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ATS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Use semantic tags: <h1> name, <h2> sections, <ul><li> bullets.
✓ DOM order = visual reading order (left column first if two-column).
✓ All text in real HTML text nodes — never in images.
✓ Section order: contact → summary → experience → education → skills.
✓ Dates in <time> tags when possible.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  REFERENCE CSS SNIPPET
━━━━━━━━━━━━━━━━━━━━━━━━━━━
.resume { font-family: 'Roboto', sans-serif; font-size: 13px; color: #111; }
.resume-header { text-align: center; margin-bottom: 14px; }
.resume-header h1 { font-size: 27px; font-weight: 700; margin: 0 0 4px; }
.tagline { font-size: 14px; color: #555; margin: 0 0 8px; }
.contact-row { display: flex; justify-content: center; gap: 16px; font-size: 12px; flex-wrap: wrap; }
h2 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: #333; margin: 14px 0 6px; }
hr { border: none; border-top: 1px solid #ddd; margin: 6px 0; }
.entry { margin-bottom: 10px; }
.entry-header { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 3px; }
ul { margin: 4px 0; padding-left: 16px; }
li { margin-bottom: 2px; line-height: 1.45; }
a { color: #1a56db; text-decoration: none; }
.skills-list { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; padding: 0; }
.skills-list li { background: #f3f4f6; padding: 3px 10px; border-radius: 4px; font-size: 12px; }

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NOW GENERATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Create a polished, single-page A4 resume for:

[DESCRIBE YOURSELF — name, role, experience, education, skills, links, etc.]`,
  },
  {
    id: "iterate",
    label: "Iterate / Refine Prompt",
    badge: "Editing",
    badgeColor: "bg-secondary text-secondary-foreground border-border",
    description:
      "Use this when you already have a resume and want AI to refine, restyle, or tweak specific sections.",
    content: `I have a resume in an HTML/CSS editor. Here are the current files:

[HTML]
<paste your current HTML here>

[CSS]
<paste your current CSS here>

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  EDITOR CONSTRAINTS (do not violate)
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Canvas: 794px × 1123px (A4). Everything must fit on ONE page.
- Body padding: 40px top/bottom, 48px left/right.
- Fonts available: 'Roboto', 'Inter' (Google Fonts, pre-loaded).
- Icons: Font Awesome 6 via <i class="fa-solid fa-..."></i>.
- Images: bare filename only — <img src="photo.png"> (no full path).
- Forbidden HTML: script, style, iframe, form, input, button, link, meta, object.
- No position: fixed or absolute for columns — use flexbox/grid only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WHAT I WANT CHANGED
━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Describe your requested changes here, for example:]
- Make the layout two-column: left sidebar for skills/contact, right for experience/education
- Change the color scheme to use a dark navy header
- Add a profile photo circle in the top-left
- Make the section headings more prominent
- Tighten spacing so everything fits better on one page

Return the complete updated [HTML] and [CSS] blocks.`,
  },
];

export default function AiGuidePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.content);
    setCopiedId(prompt.id);
    toast.success(`"${prompt.label}" copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/editor">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Editor
              </Button>
            </Link>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Bot className="h-4 w-4 text-primary" />
              AI Guide
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/rulebook" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs">
                Rulebook →
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-4xl px-6 pt-10 pb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Resume Prompts</h1>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
              Copy any prompt below and paste it into ChatGPT, Claude, Gemini, or any other AI assistant.
              Each prompt contains all the rules, dimensions, and constraints this editor requires — so the AI
              generates code that compiles and fits perfectly on a single A4 page.
            </p>
          </div>
        </div>

        {/* Tip box */}
        <div className="mt-6 flex gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">How to use:</strong> Click <em>Copy Prompt</em>, paste it into your AI chat,
            then fill in your personal details where it says <code className="rounded bg-muted px-1 py-0.5">[DESCRIBE YOURSELF HERE]</code>.
            Paste the AI&apos;s HTML output into the <strong>HTML pane</strong> and CSS into the <strong>CSS pane</strong>,
            then click <strong>▶ Compile</strong>.
          </p>
        </div>
      </div>

      {/* Prompts */}
      <div className="mx-auto max-w-4xl px-6 pb-16 space-y-8">
        {PROMPTS.map((prompt) => (
          <div key={prompt.id} className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-muted/30">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-foreground">{prompt.label}</h2>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${prompt.badgeColor}`}
                >
                  {prompt.badge}
                </span>
              </div>
              <Button
                size="sm"
                variant={copiedId === prompt.id ? "secondary" : "default"}
                className="h-8 gap-1.5 text-xs font-medium"
                onClick={() => handleCopy(prompt)}
              >
                {copiedId === prompt.id ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copiedId === prompt.id ? "Copied!" : "Copy Prompt"}
              </Button>
            </div>

            {/* Description */}
            <div className="px-5 py-3 border-b border-border bg-background">
              <p className="text-xs text-muted-foreground">{prompt.description}</p>
            </div>

            {/* Prompt Content */}
            <div className="relative">
              <pre className="overflow-x-auto whitespace-pre-wrap p-5 text-xs font-mono leading-relaxed text-foreground bg-secondary/30 max-h-[480px] overflow-y-auto">
                {prompt.content}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
