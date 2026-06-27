"use client";

import Link from "next/link";
import { FileText, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

type ToolbarProps = {
  title: string;
  onTitleChange: (title: string) => void;
  onTitleBlur: () => void;
  onDownloadPdf: () => void;
  isDownloadingPdf: boolean;
};

export default function Toolbar({
  title,
  onTitleChange,
  onTitleBlur,
  onDownloadPdf,
  isDownloadingPdf,
}: ToolbarProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <nav
      aria-label="Main toolbar"
      className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-tight text-foreground hidden sm:inline">
            Overkill Resume Maker
          </span>
        </div>
        <span className="text-border">|</span>
        {isEditingTitle ? (
          <Input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            onBlur={() => {
              setIsEditingTitle(false);
              onTitleBlur();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            aria-label="Resume title"
            className="h-8 w-48 text-sm font-medium"
            autoFocus
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditingTitle(true)}
            aria-label="Edit resume title"
            className="rounded px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            {title}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/rulebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Rulebook
          </Button>
        </Link>

        <ThemeToggle />

        <Button
          onClick={onDownloadPdf}
          disabled={isDownloadingPdf}
          aria-label="Download PDF"
          size="sm"
          className="gap-1.5 font-medium shadow-sm"
        >
          {isDownloadingPdf ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isDownloadingPdf ? "Generating…" : "Download PDF"}
        </Button>
      </div>
    </nav>
  );
}
