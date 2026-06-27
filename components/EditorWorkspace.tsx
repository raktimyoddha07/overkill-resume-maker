"use client";

import EditorShell from "@/components/Editor/EditorShell";
import PreviewShell from "@/components/Preview/PreviewShell";
import { Group, Panel, Separator } from "react-resizable-panels";

export default function EditorWorkspace() {
  return (
    <Group orientation="horizontal" className="flex-1 min-h-0">
      <Panel defaultSize={50} minSize={25}>
        <EditorShell />
      </Panel>

      <Separator className="group relative w-1.5 shrink-0 bg-gray-200 transition hover:bg-gray-400">
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-gray-400 opacity-0 transition group-hover:opacity-100" />
      </Separator>

      <Panel defaultSize={50} minSize={25}>
        <PreviewShell />
      </Panel>
    </Group>
  );
}
