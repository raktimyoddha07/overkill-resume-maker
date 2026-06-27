"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import EditorShell from "@/components/Editor/EditorShell";
import EditorSkeleton from "@/components/EditorSkeleton";
import MobileWarning from "@/components/MobileWarning";
import PreviewShell from "@/components/Preview/PreviewShell";
import Toolbar from "@/components/Toolbar";
import { Group, Panel, Separator } from "react-resizable-panels";
import { buildResumeDocument } from "@/lib/buildResumeDocument";
import { sanitizeHtml } from "@/lib/sanitize";
import { STARTER_CSS, STARTER_HTML } from "@/lib/templates";

async function saveWithRetry(
  id: string,
  data: { html: string; css: string; title: string },
  retries = 2
): Promise<void> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`/api/resume/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return;
      console.warn(`Failed to save resume (attempt ${attempt + 1})`);
    } catch (error) {
      console.warn(`Failed to save resume (attempt ${attempt + 1}):`, error);
    }
    if (attempt < retries) {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}

export default function EditorWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  const [htmlValue, setHtmlValue] = useState(STARTER_HTML);
  const [cssValue, setCssValue] = useState(STARTER_CSS);
  const [title, setTitle] = useState("Untitled Resume");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [compileError, setCompileError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(resumeId));
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(
    resumeId
  );

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const htmlRef = useRef(htmlValue);
  const cssRef = useRef(cssValue);
  const titleRef = useRef(title);

  htmlRef.current = htmlValue;
  cssRef.current = cssValue;
  titleRef.current = title;

  const scheduleSave = useCallback((id: string) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveWithRetry(id, {
        html: htmlRef.current,
        css: cssRef.current,
        title: titleRef.current,
      });
    }, 1500);
  }, []);

  useEffect(() => {
    if (!resumeId) {
      setIsLoading(false);
      setLoadError(false);
      return;
    }

    let cancelled = false;

    async function loadResume() {
      setIsLoading(true);
      setLoadError(false);
      try {
        const res = await fetch(
          `/api/resume?id=${encodeURIComponent(resumeId!)}`
        );
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (cancelled) return;
        setHtmlValue(data.html || STARTER_HTML);
        setCssValue(data.css || STARTER_CSS);
        setTitle(data.title || "Untitled Resume");
        setCurrentResumeId(data.id);
      } catch (error) {
        console.error("Load resume failed:", error);
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadResume();

    return () => {
      cancelled = true;
    };
  }, [resumeId, loadAttempt]);

  const handleCompile = useCallback(async () => {
    setIsCompiling(true);
    try {
      const sanitized = sanitizeHtml(htmlValue);
      const doc = buildResumeDocument(sanitized, cssValue);
      setPreviewSrc(doc);
      setCompileError(null);

      if (!currentResumeId) {
        const res = await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: htmlValue, css: cssValue, title }),
        });
        if (!res.ok) throw new Error("Failed to create resume");
        const data = await res.json();
        setCurrentResumeId(data.id);
        router.push(`/editor?id=${data.id}`, { scroll: false });
      } else {
        scheduleSave(currentResumeId);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Compile failed";
      setCompileError(message);
      setPreviewSrc(null);
    } finally {
      setIsCompiling(false);
    }
  }, [
    htmlValue,
    cssValue,
    title,
    currentResumeId,
    router,
    scheduleSave,
  ]);

  const handleTitleBlur = useCallback(async () => {
    if (!currentResumeId) return;
    try {
      const res = await fetch(`/api/resume/${currentResumeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) console.warn("Failed to save title");
    } catch (error) {
      console.warn("Failed to save title:", error);
    }
  }, [currentResumeId, title]);

  const handleDownloadPdf = useCallback(async () => {
    setIsDownloadingPdf(true);
    try {
      const res = await fetch("/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: htmlValue, css: cssValue, title }),
      });

      if (!res.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/[^\w\s-]/g, "").trim() || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      toast.error("PDF generation failed. Try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  }, [htmlValue, cssValue, title]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleCompile();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        handleDownloadPdf();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleCompile, handleDownloadPdf]);

  if (isLoading) {
    return <EditorSkeleton />;
  }

  if (loadError && resumeId) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-white">
        <p className="text-sm text-gray-700" role="alert">
          Could not load resume
        </p>
        <button
          type="button"
          aria-label="Retry loading resume"
          onClick={() => setLoadAttempt((n) => n + 1)}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Toolbar
        title={title}
        onTitleChange={setTitle}
        onTitleBlur={handleTitleBlur}
        onDownloadPdf={handleDownloadPdf}
        isDownloadingPdf={isDownloadingPdf}
      />
      <Group orientation="horizontal" className="flex-1 min-h-0">
        <Panel defaultSize={50} minSize={25}>
          <EditorShell
            htmlValue={htmlValue}
            cssValue={cssValue}
            onHtmlChange={setHtmlValue}
            onCssChange={setCssValue}
            onCompile={handleCompile}
            compileError={compileError}
            onDismissError={() => setCompileError(null)}
            isCompiling={isCompiling}
          />
        </Panel>

        <Separator className="group relative w-1.5 shrink-0 bg-gray-200 transition hover:bg-gray-400">
          <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-gray-400 opacity-0 transition group-hover:opacity-100" />
        </Separator>

        <Panel defaultSize={50} minSize={25}>
          <PreviewShell previewSrc={previewSrc} />
        </Panel>
      </Group>
      <MobileWarning />
    </div>
  );
}
