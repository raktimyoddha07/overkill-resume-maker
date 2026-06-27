export default function EditorSkeleton() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-3">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-5 w-24 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-8 w-28 animate-pulse rounded bg-muted" />
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 space-y-4 border-r border-border bg-background p-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-9/12 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex-1 bg-muted/40 p-8 flex justify-center items-center">
          <div
            className="animate-pulse rounded bg-muted shadow-lg"
            style={{ width: 794, height: 1123, maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
