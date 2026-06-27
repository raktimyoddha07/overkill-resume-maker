import { EditorView } from "@codemirror/view";

const theme = {
  "&": {
    height: "100%",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
  },
  ".cm-scroller": {
    overflow: "auto",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "13px",
    lineHeight: "1.5",
  },
  ".cm-content": {
    caretColor: "var(--foreground)",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "var(--foreground)",
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
    backgroundColor: "color-mix(in srgb, var(--primary) 35%, transparent) !important",
  },
  "&.cm-focused .cm-selectionMatch, .cm-selectionMatch": {
    backgroundColor: "color-mix(in srgb, var(--primary) 20%, transparent) !important",
  },
  ".cm-gutters": {
    backgroundColor: "var(--background)",
    color: "color-mix(in srgb, var(--foreground) 40%, transparent)",
    borderRight: "1px solid var(--border)",
  },
  ".cm-gutterElement": {
    padding: "0 8px 0 12px",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
    color: "var(--foreground)",
    fontWeight: "bold",
  },
  ".cm-activeLine": {
    backgroundColor: "color-mix(in srgb, var(--primary) 5%, transparent)",
  },
  // Folding gutter hover styles like VS Code
  ".cm-foldGutter .cm-gutterElement": {
    transition: "opacity 0.15s ease-in-out, color 0.15s",
    opacity: 0,
    cursor: "pointer",
    padding: "0 4px",
  },
  ".cm-gutters:hover .cm-foldGutter .cm-gutterElement": {
    opacity: 0.6,
  },
  ".cm-foldGutter .cm-gutterElement:hover": {
    opacity: 1,
    color: "var(--primary) !important",
  },
};

export const editorLightTheme = EditorView.theme(theme);
export const editorDarkTheme = EditorView.theme(theme, { dark: true });
