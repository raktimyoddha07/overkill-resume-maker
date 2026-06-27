import { EditorView } from "@codemirror/view";

const lightTheme = {
  "&": {
    height: "100%",
    backgroundColor: "#ffffff",
    color: "#1f2937",
  },
  ".cm-scroller": {
    overflow: "auto",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "13px",
    lineHeight: "1.5",
  },
  ".cm-content": {
    caretColor: "#111827",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#111827",
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
    backgroundColor: "#dbeafe",
  },
  ".cm-gutters": {
    backgroundColor: "#f9fafb",
    color: "#9ca3af",
    borderRight: "1px solid #e5e7eb",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#f3f4f6",
  },
  ".cm-activeLine": {
    backgroundColor: "#f9fafb",
  },
};

const darkTheme = {
  "&": {
    height: "100%",
    backgroundColor: "hsl(222.2, 84%, 4.9%)",
    color: "#f8fafc",
  },
  ".cm-scroller": {
    overflow: "auto",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "13px",
    lineHeight: "1.5",
  },
  ".cm-content": {
    caretColor: "#f8fafc",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#f8fafc",
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
    backgroundColor: "hsl(217.2, 32.6%, 17.5%)",
  },
  ".cm-gutters": {
    backgroundColor: "hsl(222.2, 84%, 4.9%)",
    color: "hsl(215, 20.2%, 65.1%)",
    borderRight: "1px solid hsl(217.2, 32.6%, 17.5%)",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "hsl(217.2, 32.6%, 17.5%)",
    color: "#f8fafc",
  },
  ".cm-activeLine": {
    backgroundColor: "hsl(222.2, 47.4%, 11.2%)",
  },
};

export const editorLightTheme = EditorView.theme(lightTheme);
export const editorDarkTheme = EditorView.theme(darkTheme, { dark: true });
