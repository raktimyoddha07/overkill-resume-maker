import Link from "next/link";
import RulebookContent from "@/components/Rulebook/RulebookContent";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";

export default function RulebookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div>
            <Link href="/editor">
              <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Editor
              </Button>
            </Link>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Resume Rulebook</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              HTML, CSS, assets, and ATS guidelines for building resumes in this editor.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <RulebookContent />
    </div>
  );
}
