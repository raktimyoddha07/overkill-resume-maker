import sanitizeHtmlLib from "sanitize-html";

export const ALLOWED_TAGS = [
  "div",
  "span",
  "section",
  "header",
  "footer",
  "article",
  "main",
  "nav",
  "aside",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "br",
  "hr",
  "strong",
  "b",
  "em",
  "i",
  "small",
  "sub",
  "sup",
  "blockquote",
  "cite",
  "abbr",
  "time",
  "mark",
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  "a",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "colgroup",
  "col",
  "img",
];

export const BLOCKED_TAGS: Record<string, string> = {
  script: "JavaScript is not allowed in resume HTML.",
  style: "Inline <style> tags are not allowed — use the CSS editor instead.",
  iframe: "<iframe> elements are not allowed.",
  object: "<object> elements are not allowed.",
  embed: "<embed> elements are not allowed.",
  form: "<form> elements are not allowed.",
  input: "<input> elements are not allowed.",
  button: "<button> elements are not allowed.",
  select: "<select> elements are not allowed.",
  textarea: "<textarea> elements are not allowed.",
  link: "<link> elements are not allowed.",
  meta: "<meta> elements are not allowed.",
  base: "<base> elements are not allowed.",
  svg: "<svg> elements are not allowed.",
  canvas: "<canvas> elements are not allowed.",
  video: "<video> elements are not allowed.",
  audio: "<audio> elements are not allowed.",
  picture: "<picture> elements are not allowed.",
  source: "<source> elements are not allowed.",
};

const GLOBAL_ATTRS = ["class", "id", "style", "title", "lang", "dir"];
const ARIA_ATTRS = [
  "aria-label",
  "aria-hidden",
  "aria-describedby",
  "aria-labelledby",
  "aria-role",
];

function buildAllowedAttributes(): Record<string, string[]> {
  const attrs = [...GLOBAL_ATTRS, ...ARIA_ATTRS];
  const map: Record<string, string[]> = {};
  for (const tag of ALLOWED_TAGS) {
    map[tag] = [...attrs];
  }
  map.a = [...attrs, "href", "target", "rel"];
  map.img = [...attrs, "src", "alt", "width", "height"];
  map.th = [...attrs, "colspan", "rowspan", "scope"];
  map.td = [...attrs, "colspan", "rowspan"];
  map.col = [...attrs, "span"];
  map.colgroup = [...attrs, "span"];
  return map;
}

const TAG_PATTERN = /<\s*([a-zA-Z][\w-]*)/g;

function findBlockedTag(raw: string): string | null {
  let match: RegExpExecArray | null;
  const pattern = new RegExp(TAG_PATTERN.source, TAG_PATTERN.flags);
  while ((match = pattern.exec(raw)) !== null) {
    const tag = match[1].toLowerCase();
    if (BLOCKED_TAGS[tag]) {
      return tag;
    }
  }
  return null;
}

export function sanitizeHtml(raw: string): string {
  const blocked = findBlockedTag(raw);
  if (blocked) {
    throw new Error(
      `Blocked element <${blocked}>: ${BLOCKED_TAGS[blocked]}`
    );
  }

  return sanitizeHtmlLib(raw, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: buildAllowedAttributes(),
    allowedSchemes: ["http", "https", "mailto", "data"],
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
      a: ["http", "https", "mailto"],
    },
    allowProtocolRelative: true,
    allowVulnerableTags: false,
    disallowedTagsMode: "discard",
  });
}
