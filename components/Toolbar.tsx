import Link from "next/link";
import { FileText } from "lucide-react";

export default function Toolbar() {
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
        disabled
        aria-label="Download PDF"
        className="cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-500"
      >
        Download PDF
      </button>
    </nav>
  );
}
