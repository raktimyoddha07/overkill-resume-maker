import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-8 bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
        Overkill Resume Maker
      </h1>
      <p className="max-w-md text-center text-muted-foreground text-base">
        Build ATS-friendly resumes with HTML and CSS. Open the editor to get
        started.
      </p>
      <Link
        href="/editor"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Open Editor
      </Link>
    </main>
  );
}
