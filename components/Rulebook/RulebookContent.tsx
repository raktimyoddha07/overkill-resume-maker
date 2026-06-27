import { ALLOWED_TAGS, BLOCKED_TAGS } from "@/lib/sanitize";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-secondary p-4 text-xs font-mono text-secondary-foreground">
      <code>{children}</code>
    </pre>
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
  { tag: "img", description: "Images (uploads, https, or data URIs)", example: '<img src="/api/uploads/photo.png" alt="Photo" />' },
];

export default function RulebookContent() {
  const blockedEntries = Object.entries(BLOCKED_TAGS);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-foreground">
      <p className="mb-10 text-sm text-muted-foreground">
        Reference for writing resume HTML and CSS in Overkill Resume Maker.
        Allowed tags: {ALLOWED_TAGS.length} elements. Blocked tags are rejected at compile time with a clear error.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">1. Allowed HTML Elements</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold text-xs">Tag</th>
                <th className="px-4 py-3 font-semibold text-xs">Description</th>
                <th className="px-4 py-3 font-semibold text-xs">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ALLOWED_ELEMENTS.map((row) => (
                <tr key={row.tag} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{row.tag}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{row.description}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground/80">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">2. Blocked HTML Elements</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold text-xs">Tag</th>
                <th className="px-4 py-3 font-semibold text-xs">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blockedEntries.map(([tag, reason]) => (
                <tr key={tag} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">&lt;{tag}&gt;</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">3. CSS Usage</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Full CSS is allowed in the CSS editor pane. Use classes and IDs from your HTML to style sections,
          typography, spacing, flexbox, and grid layouts. Inline <code className="rounded bg-muted px-1.5 py-0.5 text-xs">style</code>
          attributes on HTML elements are also permitted.
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          <strong className="text-foreground">PDF caveat:</strong> Avoid <code className="rounded bg-muted px-1.5 py-0.5 text-xs">position: fixed</code>
          for layout-critical content. Fixed elements may not render consistently across preview and PDF export.
          Prefer flexbox, grid, or normal document flow.
        </p>
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

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">4. Icons</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Font Awesome 6 is loaded automatically in preview and PDF. Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">&lt;i&gt;</code>
          tags with Font Awesome class names.
        </p>
        <CodeBlock>{`<i class="fa-solid fa-envelope"></i> Email
<i class="fa-solid fa-phone"></i> Phone
<i class="fa-solid fa-location-dot"></i> Location
<i class="fa-brands fa-linkedin"></i> LinkedIn
<i class="fa-brands fa-github"></i> GitHub
<i class="fa-solid fa-globe"></i> Portfolio
<i class="fa-solid fa-calendar"></i> Calendar`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">5. Hyperlinks</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Use standard <code className="rounded bg-muted px-1.5 py-0.5 text-xs">&lt;a href=&quot;...&quot;&gt;</code> links.
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">target=&quot;_blank&quot;</code> is allowed for external URLs.
          Links are preserved in the PDF export and remain clickable.
        </p>
        <CodeBlock>{`<a href="mailto:jane@example.com">jane@example.com</a>
<a href="https://linkedin.com/in/janedoe" target="_blank" rel="noopener noreferrer">
  linkedin.com/in/janedoe
</a>`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">6. Images & Assets</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          You can upload images directly using the <strong>Assets</strong> tab in the editor. Images get saved to the root <code className="rounded bg-muted px-1.5 py-0.5 text-xs">uploads/</code> folder.
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">https://</code> and <code className="rounded bg-muted px-1.5 py-0.5 text-xs">data:</code> URIs are also allowed.
          Always include descriptive <code className="rounded bg-muted px-1.5 py-0.5 text-xs">alt</code> text for accessibility and ATS parsers.
        </p>
        <CodeBlock>{`<!-- Uploaded asset reference -->
<img src="/api/uploads/photo_123.png" alt="Jane Doe" width="80" height="80" class="profile-photo" />

<!-- External HTTPS image -->
<img src="https://example.com/photo.jpg" alt="Jane Doe" />`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">7. A4 Dimensions</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The preview canvas and PDF export use standard A4 at 96 DPI: <strong>794px × 1123px</strong>.
          The base stylesheet applies <strong>40px top/bottom</strong> and <strong>48px left/right</strong> body padding —
          design within that content area for consistent margins.
        </p>
        <CodeBlock>{`/* Canvas: 794 × 1123 px
   Content area after default padding: ~694 × ~943 px */`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">8. Typography</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Roboto and Inter are loaded from Google Fonts. Reference them in your CSS:
        </p>
        <CodeBlock>{`body { font-family: 'Roboto', sans-serif; }
.tagline { font-family: 'Inter', sans-serif; font-size: 15px; }

/* Recommended scale */
h1 { font-size: 28px; }
h2 { font-size: 16px; }
body, li { font-size: 13–14px; }
small { font-size: 11px; }`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">9. Tables</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Tables work well for skills grids, publication lists, or certification matrices.
          Keep headers in <code className="rounded bg-muted px-1.5 py-0.5 text-xs">&lt;th&gt;</code> cells for ATS readability.
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

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground tracking-tight">10. ATS Tips</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Do not create multi-column layouts with absolute positioning — ATS parsers read linear document order.</li>
          <li>Use flexbox or grid with a logical DOM order that matches visual reading order.</li>
          <li>Never put essential text inside images — parsers cannot read image content.</li>
          <li>Use real headings (<code className="rounded bg-muted px-1.5 py-0.5 text-xs">h1</code>, <code className="rounded bg-muted px-1.5 py-0.5 text-xs">h2</code>) for section titles, not styled <code className="rounded bg-muted px-1.5 py-0.5 text-xs">div</code>s.</li>
          <li>Include full URLs in link text or nearby text when possible for clarity.</li>
          <li>Keep section order conventional: contact → summary → experience → education → skills.</li>
        </ul>
      </section>
    </div>
  );
}
