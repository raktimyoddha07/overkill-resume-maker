"use client";

import { useState } from "react";
import { Loader2, Play, Code2, Palette, Image as ImageIcon } from "lucide-react";
import HtmlPane from "./HtmlPane";
import CssPane from "./CssPane";
import AssetsPane from "./AssetsPane";
import { Button } from "@/components/ui/button";

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
  const [activeTab, setActiveTab] = useState<"html" | "css" | "assets">("html");

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5">
        <div className="flex items-center gap-1">
          <Button
            variant={activeTab === "html" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("html")}
            aria-label="HTML tab"
            className="h-8 gap-1.5 px-3 text-xs font-semibold"
          >
            <Code2 className="h-3.5 w-3.5 text-blue-500" />
            HTML
          </Button>
          <Button
            variant={activeTab === "css" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("css")}
            aria-label="CSS tab"
            className="h-8 gap-1.5 px-3 text-xs font-semibold"
          >
            <Palette className="h-3.5 w-3.5 text-amber-500" />
            CSS
          </Button>
          <Button
            variant={activeTab === "assets" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("assets")}
            aria-label="Assets tab"
            className="h-8 gap-1.5 px-3 text-xs font-semibold"
          >
            <ImageIcon className="h-3.5 w-3.5 text-emerald-500" />
            Assets
          </Button>
        </div>

        <Button
          onClick={onCompile}
          disabled={isCompiling}
          aria-label="Compile resume"
          size="sm"
          className="h-8 gap-1.5 px-3.5 text-xs font-semibold shadow-sm"
        >
          {isCompiling ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          )}
          {isCompiling ? "Compiling…" : "Compile"}
        </Button>
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
        <div
          className="absolute inset-0"
          style={{
            visibility: activeTab === "assets" ? "visible" : "hidden",
            pointerEvents: activeTab === "assets" ? "auto" : "none",
          }}
        >
          <AssetsPane />
        </div>
      </div>
    </div>
  );
}
