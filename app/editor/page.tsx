import EditorWorkspace from "@/components/EditorWorkspace";
import Toolbar from "@/components/Toolbar";

export default function EditorPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Toolbar />
      <EditorWorkspace />
    </div>
  );
}
