import A4Canvas from "./A4Canvas";

type PreviewShellProps = {
  previewSrc: string | null;
};

export default function PreviewShell({ previewSrc }: PreviewShellProps) {
  return (
    <div className="h-full min-h-0 overflow-auto bg-[#e5e7eb]">
      <div className="flex min-h-full items-start justify-center p-8">
        <A4Canvas srcdoc={previewSrc} />
      </div>
    </div>
  );
}
