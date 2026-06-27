"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import HtmlPane from "./HtmlPane";
import CssPane from "./CssPane";

type EditorNavbarProps = {
  htmlValue: string;
  cssValue: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onCompile: () => void;
  isCompiling: boolean;
};

export default function EditorNavbar({
  htmlValue,
  cssValue,
  onHtmlChange,
  onCssChange,
  onCompile,
  isCompiling,
}: EditorNavbarProps) {
  const [activeTab, setActiveTab] = useState<"html" | "css">("html");

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center gap-1 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <button
          type="button"
          aria-label="HTML tab"
          onClick={() => setActiveTab("html")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            activeTab === "html"
              ? "border border-gray-300 bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          HTML
        </button>
        <button
          type="button"
          aria-label="CSS tab"
          onClick={() => setActiveTab("css")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            activeTab === "css"
              ? "border border-gray-300 bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          CSS
        </button>
        <button
          type="button"
          aria-label="Compile"
          onClick={onCompile}
          disabled={isCompiling}
          className="ml-auto flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          {isCompiling ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : null}
          {isCompiling ? "Compiling…" : "▶ Compile"}
        </button>
      </div>

      <div className="relative flex-1 min-h-0">
        <div
          className="absolute inset-0"
          style={{
            visibility: activeTab === "html" ? "visible" : "hidden",
            pointerEvents: activeTab === "html" ? "auto" : "none",
          }}
        >
          <HtmlPane
            value={htmlValue}
            onChange={onHtmlChange}
            isVisible={activeTab === "html"}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            visibility: activeTab === "css" ? "visible" : "hidden",
            pointerEvents: activeTab === "css" ? "auto" : "none",
          }}
        >
          <CssPane
            value={cssValue}
            onChange={onCssChange}
            isVisible={activeTab === "css"}
          />
        </div>
      </div>
    </div>
  );
}
