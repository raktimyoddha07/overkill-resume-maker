export default function EditorSkeleton() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex h-14 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4">
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 space-y-3 border-r border-gray-200 bg-white p-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-9/12 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex-1 bg-[#e5e7eb] p-8">
          <div
            className="mx-auto animate-pulse bg-gray-300"
            style={{ width: 794, height: 1123 }}
          />
        </div>
      </div>
    </div>
  );
}
