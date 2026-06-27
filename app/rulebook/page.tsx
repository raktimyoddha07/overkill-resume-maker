import Link from "next/link";
import RulebookContent from "@/components/Rulebook/RulebookContent";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, BookOpen } from "lucide-react";

export const metadata = {
  title: "Resume Rulebook – Overkill Resume Maker",
  description: "HTML, CSS, assets, and ATS guidelines for building resumes. Includes AI prompt guide.",
};

export default function RulebookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/editor">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Editor
              </Button>
            </Link>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              Resume Rulebook
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 pt-8 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Resume Rulebook</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          HTML, CSS, assets, and ATS guidelines — plus a ready-to-use AI prompt for generating resume code.
        </p>
      </div>

      <RulebookContent />
    </div>
  );
}
