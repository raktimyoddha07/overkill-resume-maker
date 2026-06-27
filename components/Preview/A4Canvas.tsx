"use client";

type A4CanvasProps = {
  srcdoc: string | null;
  scale?: number;
};

export default function A4Canvas({ srcdoc, scale = 1 }: A4CanvasProps) {
  const width = 794;
  const height = 1123;

  return (
    <div
      style={{
        width: width * scale,
        height: height * scale,
        transition: "width 0.2s ease, height 0.2s ease",
      }}
      className="relative shrink-0 select-none shadow-[0_10px_38px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_14px_44px_rgba(0,0,0,0.22)]"
    >
      {!srcdoc ? (
        <div
          className="flex h-full w-full items-center justify-center bg-white text-sm font-medium text-muted-foreground"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width,
            height,
          }}
        >
          Click Compile to preview your resume
        </div>
      ) : (
        <iframe
          title="Resume preview"
          sandbox="allow-same-origin"
          srcDoc={srcdoc}
          scrolling="no"
          className="border-none bg-white overflow-hidden pointer-events-auto"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width,
            height,
          }}
        />
      )}
    </div>
  );
}
