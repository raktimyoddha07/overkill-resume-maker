"use client";

import { useState, useEffect, useRef } from "react";
import A4Canvas from "./A4Canvas";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, FileText } from "lucide-react";

type PreviewShellProps = {
  previewSrc: string | null;
};

export default function PreviewShell({ previewSrc }: PreviewShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomMode, setZoomMode] = useState<"auto" | number>("auto");
  const [computedScale, setComputedScale] = useState<number>(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (!containerRef.current) return;
      if (zoomMode === "auto") {
        const availableWidth = containerRef.current.clientWidth - 64; // padding
        const availableHeight = containerRef.current.clientHeight - 80; // padding & controls
        const scaleX = availableWidth / 794;
        const scaleY = availableHeight / 1123;
        // Fit nicely into viewport with a max of 1.0 and min of 0.35
        const fit = Math.min(scaleX, scaleY, 1.1);
        setComputedScale(Math.max(0.35, Math.min(fit, 1)));
      } else {
        setComputedScale(zoomMode);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [zoomMode]);

  const handleZoomIn = () => {
    setZoomMode((prev) => {
      const current = typeof prev === "number" ? prev : computedScale;
      return Math.min(1.5, Math.round((current + 0.1) * 10) / 10);
    });
  };

  const handleZoomOut = () => {
    setZoomMode((prev) => {
      const current = typeof prev === "number" ? prev : computedScale;
      return Math.max(0.4, Math.round((current - 0.1) * 10) / 10);
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-muted/40 dark:bg-zinc-950">
      {/* Control Bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-card px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span>A4 Sheet (794 × 1123 px)</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleZoomOut}
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>

          <span className="w-12 text-center text-xs font-semibold text-foreground">
            {Math.round(computedScale * 100)}%
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleZoomIn}
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant={zoomMode === "auto" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 px-2 text-xs gap-1"
            onClick={() => setZoomMode("auto")}
            title="Fit to screen"
          >
            <Maximize2 className="h-3 w-3" />
            Fit
          </Button>

          <Button
            variant={zoomMode === 1 ? "secondary" : "ghost"}
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => setZoomMode(1)}
            title="100% size"
          >
            100%
          </Button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div
        ref={containerRef}
        className="flex flex-1 min-h-0 items-center justify-center overflow-auto p-8"
      >
        <A4Canvas srcdoc={previewSrc} scale={computedScale} />
      </div>
    </div>
  );
}
