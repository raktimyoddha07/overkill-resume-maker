import { ALLOWED_TAGS, BLOCKED_TAGS } from "@/lib/sanitize";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-900 p-4 text-sm text-gray-100">
      <code>{children}</code>
    </pre>
  );
}

const ALLOWED_ELEMENTS: { tag: string; description: string; example: string }[] = [
  { tag: "div, span", description: "Generic containers and inline wrappers", example: "<div class=\"entry\"><span>2024</span></div>" },
  { tag: "section, header, footer", description: "Semantic page sections", example: "<section><h2>Experience</h2></section>" },
  { tag: "article, main, nav, aside", description: "Additional semantic landmarks", example: "<header class=\"resume-header\">...</header>" },
  { tag: "p", description: "Paragraph text", example: "<p class=\"tagline\">Full Stack Developer</p>" },
  { tag: "h1–h6", description: "Headings (use h1 once for name)", example: "<h1>Jane Doe</h1><h2>Skills</h2>" },
  { tag: "br, hr", description: "Line break and horizontal rule", example: "<hr />" },
  { tag: "strong, b, em, i", description: "Bold, emphasis, and icons (via Font Awesome on <i>)", example: "<strong>Senior Developer</strong>" },
  { tag: "small, sub, sup", description: "Smaller or positioned text", example: "<small>Remote</small>" },
  { tag: "blockquote, cite", description: "Quoted text and citations", example: "<blockquote>Great collaborator.</blockquote>" },
  { tag: "abbr, time, mark", description: "Abbreviations, dates, highlighted text", example: "<time>2021 – Present</time>" },
  { tag: "ul, ol, li", description: "Bullet and numbered lists", example: "<ul><li>Built APIs</li></ul>" },
  { tag: "dl, dt, dd", description: "Definition lists", example: "<dl><dt>Python</dt><dd>Expert</dd></dl>" },
  { tag: "a", description: "Hyperlinks (email, web, LinkedIn, etc.)", example: "<a href=\"mailto:jane@example.com\">Email</a>" },
  { tag: "table, thead, tbody, tfoot", description: "Tabular data structures", example: "<table><thead><tr><th>Skill</th></tr></thead></table>" },
  { tag: "tr, th, td", description: "Table rows and cells", example: "<tr><td>TypeScript</td><td>Expert</td></tr>" },
  { tag: "caption, colgroup, col", description: "Table captions and column groups", example: "<caption>Publications</caption>" },
  { tag: "img", description: "Images (https or data URIs only)", example: "<img src=\"https://example.com/photo.jpg\" alt=\"Photo\" />" },
];

export default function RulebookContent() {
  const blockedEntries = Object.entries(BLOCKED_TAGS);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <p className="mb-10 text-gray-600">
        Reference for writing resume HTML and CSS in Overkill Resume Maker.
        Allowed tags: {ALLOWED_TAGS.length} elements. Blocked tags are rejected at compile time with a clear error.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">1. Allowed HTML Elements</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">Tag</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ALLOWED_ELEMENTS.map((row) => (
                <tr key={row.tag} className="bg-white">
                  <td className="px-4 py-3 font-mono text-gray-900">{row.tag}</td>
                  <td className="px-4 py-3 text-gray-600">{row.description}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">2. Blocked HTML Elements</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">Tag</th>
                <th className="px-4 py-3 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blockedEntries.map(([tag, reason]) => (
                <tr key={tag} className="bg-white">
                  <td className="px-4 py-3 font-mono text-gray-900">&lt;{tag}&gt;</td>
                  <td className="px-4 py-3 text-gray-600">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">3. CSS Usage</h2>
        <p className="mb-4 text-gray-600">
          Full CSS is allowed in the CSS editor pane. Use classes and IDs from your HTML to style sections,
          typography, spacing, flexbox, and grid layouts. Inline <code className="rounded bg-gray-100 px-1">style</code>
          attributes on HTML elements are also permitted.
        </p>
        <p className="mb-4 text-gray-600">
          <strong className="text-gray-900">PDF caveat:</strong> Avoid <code className="rounded bg-gray-100 px-1">position: fixed</code>
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
        <h2 className="mb-4 text-xl font-semibold text-gray-900">4. Icons</h2>
        <p className="mb-4 text-gray-600">
          Font Awesome 6 is loaded automatically in preview and PDF. Use <code className="rounded bg-gray-100 px-1">&lt;i&gt;</code>
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
        <h2 className="mb-4 text-xl font-semibold text-gray-900">5. Hyperlinks</h2>
        <p className="mb-4 text-gray-600">
          Use standard <code className="rounded bg-gray-100 px-1">&lt;a href="..."&gt;</code> links.
          <code className="rounded bg-gray-100 px-1">target="_blank"</code> is allowed for external URLs.
          Links are preserved in the PDF export and remain clickable.
        </p>
        <CodeBlock>{`<a href="mailto:jane@example.com">jane@example.com</a>
<a href="https://linkedin.com/in/janedoe" target="_blank" rel="noopener noreferrer">
  linkedin.com/in/janedoe
</a>`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">6. Images</h2>
        <p className="mb-4 text-gray-600">
          Only <code className="rounded bg-gray-100 px-1">https://</code> and
          <code className="rounded bg-gray-100 px-1">data:</code> image URIs are allowed.
          Always include descriptive <code className="rounded bg-gray-100 px-1">alt</code> text for accessibility and ATS parsers.
        </p>
        <CodeBlock>{`<!-- Profile photo from HTTPS -->
<img src="https://example.com/photo.jpg" alt="Jane Doe" width="80" height="80" class="profile-photo" />

<!-- Small embedded image via data URI -->
<img src="data:image/png;base64,..." alt="Company logo" />`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">7. A4 Dimensions</h2>
        <p className="mb-4 text-gray-600">
          The preview canvas and PDF export use A4 at 96 DPI: <strong>794px × 1123px</strong>.
          The base stylesheet applies <strong>40px top/bottom</strong> and <strong>48px left/right</strong> body padding —
          design within that content area for consistent margins.
        </p>
        <CodeBlock>{`/* Canvas: 794 × 1123 px
   Content area after default padding: ~694 × ~943 px */`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">8. Typography</h2>
        <p className="mb-4 text-gray-600">
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
        <h2 className="mb-4 text-xl font-semibold text-gray-900">9. Tables</h2>
        <p className="mb-4 text-gray-600">
          Tables work well for skills grids, publication lists, or certification matrices.
          Keep headers in <code className="rounded bg-gray-100 px-1">&lt;th&gt;</code> cells for ATS readability.
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
        <h2 className="mb-4 text-xl font-semibold text-gray-900">10. ATS Tips</h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-600">
          <li>Do not create multi-column layouts with absolute positioning — ATS parsers read linear document order.</li>
          <li>Use flexbox or grid with a logical DOM order that matches visual reading order.</li>
          <li>Never put essential text inside images — parsers cannot read image content.</li>
          <li>Use real headings (<code className="rounded bg-gray-100 px-1">h1</code>, <code className="rounded bg-gray-100 px-1">h2</code>) for section titles, not styled <code className="rounded bg-gray-100 px-1">div</code>s.</li>
          <li>Include full URLs in link text or nearby text when possible for clarity.</li>
          <li>Keep section order conventional: contact → summary → experience → education → skills.</li>
        </ul>
      </section>
    </div>
  );
}
