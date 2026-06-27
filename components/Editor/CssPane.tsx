"use client";

import { useEffect, useRef } from "react";
import { editorTheme } from "@/lib/codemirror-theme";

type CssPaneProps = {
  value: string;
  onChange: (value: string) => void;
  isVisible: boolean;
};

export default function CssPane({ value, onChange, isVisible }: CssPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<{ destroy: () => void; requestMeasure: () => void } | null>(
    null
  );
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;

    async function initEditor() {
      const [{ basicSetup }, { css }, { EditorState }, { EditorView }] =
        await Promise.all([
          import("codemirror"),
          import("@codemirror/lang-css"),
          import("@codemirror/state"),
          import("@codemirror/view"),
        ]);

      if (destroyed || !containerRef.current) return;

      const view = new EditorView({
        state: EditorState.create({
          doc: value,
          extensions: [
            basicSetup,
            css(),
            EditorView.lineWrapping,
            editorTheme,
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
    if (isVisible) {
      viewRef.current?.requestMeasure();
    }
  }, [isVisible]);

  useEffect(() => {
    const view = viewRef.current as {
      state: { doc: { toString: () => string; length: number } };
      dispatch: (arg: unknown) => void;
    } | null;
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
