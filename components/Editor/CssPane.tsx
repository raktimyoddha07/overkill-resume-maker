"use client";

import { useEffect, useRef } from "react";
import { editorLightTheme, editorDarkTheme } from "@/lib/codemirror-theme";
import { useTheme } from "next-themes";

type CssPaneProps = {
  value: string;
  onChange: (value: string) => void;
  isVisible: boolean;
};

export default function CssPane({ value, onChange, isVisible }: CssPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<any>(null);
  const themeCompartmentRef = useRef<any>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;

    async function initEditor() {
      const [{ basicSetup }, { css }, { EditorState, Compartment }, { EditorView, keymap }, { indentWithTab }] =
        await Promise.all([
          import("codemirror"),
          import("@codemirror/lang-css"),
          import("@codemirror/state"),
          import("@codemirror/view"),
          import("@codemirror/commands"),
        ]);

      if (destroyed || !containerRef.current) return;

      const themeCompartment = new Compartment();
      themeCompartmentRef.current = themeCompartment;

      const view = new EditorView({
        state: EditorState.create({
          doc: value,
          extensions: [
            basicSetup,
            css(),
            keymap.of([indentWithTab]),
            EditorView.lineWrapping,
            themeCompartment.of(resolvedTheme === "dark" ? editorDarkTheme : editorLightTheme),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                onChangeRef.current(update.state.doc.toString());
              }
            }),
          ],
        }),
        parent: containerRef.current,
      });

      viewRef.current = view;
      view.requestMeasure();
    }

    initEditor();

    return () => {
      destroyed = true;
      viewRef.current?.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (viewRef.current && themeCompartmentRef.current) {
      viewRef.current.dispatch({
        effects: themeCompartmentRef.current.reconfigure(
          resolvedTheme === "dark" ? editorDarkTheme : editorLightTheme
        ),
      });
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (isVisible) {
      viewRef.current?.requestMeasure();
    }
  }, [isVisible]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (value !== current) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return <div ref={containerRef} className="h-full min-h-0 overflow-hidden" />;
}
