type A4CanvasProps = {
  srcdoc: string | null;
};

export default function A4Canvas({ srcdoc }: A4CanvasProps) {
  if (!srcdoc) {
    return (
      <div
        className="flex items-center justify-center bg-white text-sm text-gray-500 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        style={{ width: 794, height: 1123 }}
      >
        Click Compile to preview your resume
      </div>
    );
  }

  return (
    <iframe
      title="Resume preview"
      sandbox="allow-same-origin"
      srcDoc={srcdoc}
      className="border-none bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
      style={{ width: 794, height: 1123 }}
    />
  );
}
