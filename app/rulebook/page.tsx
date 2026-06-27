import Link from "next/link";
import RulebookContent from "@/components/Rulebook/RulebookContent";

export default function RulebookPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-5">
        <Link
          href="/editor"
          className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to Editor
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">Resume Rulebook</h1>
        <p className="mt-1 text-sm text-gray-600">
          HTML, CSS, and ATS guidelines for building resumes in this editor.
        </p>
      </header>
      <RulebookContent />
    </div>
  );
}
