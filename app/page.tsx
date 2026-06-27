import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Overkill Resume Maker
      </h1>
      <p className="max-w-md text-center text-gray-600">
        Build ATS-friendly resumes with HTML and CSS. Open the editor to get
        started.
      </p>
      <Link
        href="/editor"
        className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Open Editor
      </Link>
    </main>
  );
}
