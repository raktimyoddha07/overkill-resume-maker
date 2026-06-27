"use client";

import EditorNavbar from "./EditorNavbar";
import { AlertCircle, X } from "lucide-react";

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
    <div className="flex h-full min-h-0 flex-col bg-background">
      {compileError && (
        <div
          role="alert"
          className="flex shrink-0 items-center justify-between gap-3 border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{compileError}</span>
          </div>
          <button
            type="button"
            aria-label="Dismiss compile error"
            onClick={onDismissError}
            className="shrink-0 rounded p-0.5 hover:bg-destructive/20 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
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
