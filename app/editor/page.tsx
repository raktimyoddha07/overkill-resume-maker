import { Suspense } from "react";
import EditorWorkspace from "@/components/EditorWorkspace";

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-sm text-muted-foreground bg-background">
          Loading editor…
        </div>
      }
    >
      <EditorWorkspace />
    </Suspense>
  );
}
