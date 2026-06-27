"use client";

import EditorNavbar from "./EditorNavbar";

type EditorShellProps = {
  htmlValue: string;
  cssValue: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onCompile: () => void;
  compileError: string | null;
  onDismissError: () => void;
  isCompiling: boolean;
};

export default function EditorShell({
  htmlValue,
  cssValue,
  onHtmlChange,
  onCssChange,
  onCompile,
  compileError,
  onDismissError,
  isCompiling,
}: EditorShellProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {compileError && (
        <div
          role="alert"
          className="flex shrink-0 items-center justify-between gap-3 border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800"
        >
          <span>{compileError}</span>
          <button
            type="button"
            aria-label="Dismiss compile error"
            onClick={onDismissError}
            className="shrink-0 rounded px-2 py-0.5 text-red-600 hover:bg-red-100"
          >
            ✕
          </button>
        </div>
      )}
      <EditorNavbar
        htmlValue={htmlValue}
        cssValue={cssValue}
        onHtmlChange={onHtmlChange}
        onCssChange={onCssChange}
        onCompile={onCompile}
        isCompiling={isCompiling}
      />
    </div>
  );
}
