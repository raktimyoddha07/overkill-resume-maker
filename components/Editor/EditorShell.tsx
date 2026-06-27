export default function EditorShell() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex shrink-0 items-center gap-1 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <button
          type="button"
          aria-label="HTML tab"
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 shadow-sm"
        >
          HTML
        </button>
        <button
          type="button"
          aria-label="CSS tab"
          className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          CSS
        </button>
        <button
          type="button"
          aria-label="Compile"
          className="ml-auto rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white"
        >
          ▶ Compile
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gray-50 text-sm text-gray-400">
        Editor content will appear here
      </div>
    </div>
  );
}
