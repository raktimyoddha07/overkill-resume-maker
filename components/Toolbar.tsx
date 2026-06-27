"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useState } from "react";

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
      className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4"
    >
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-gray-900" aria-hidden="true" />
        <span className="text-sm font-semibold text-gray-900">
          Overkill Resume Maker
        </span>
        <span className="text-gray-300">|</span>
        {isEditingTitle ? (
          <input
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
            className="rounded border border-gray-300 px-2 py-0.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditingTitle(true)}
            aria-label="Edit resume title"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {title}
          </button>
        )}
      </div>

      <Link
        href="/rulebook"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        Rulebook
      </Link>

      <button
        type="button"
        onClick={onDownloadPdf}
        disabled={isDownloadingPdf}
        aria-label="Download PDF"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isDownloadingPdf ? "Generating…" : "Download PDF"}
      </button>
    </nav>
  );
}
