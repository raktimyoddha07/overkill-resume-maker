import { NextRequest, NextResponse } from "next/server";
import { buildResumeDocument } from "@/lib/buildResumeDocument";
import { getBrowser } from "@/lib/puppeteer-browser";
import { sanitizeHtml } from "@/lib/sanitize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let page: Awaited<
    ReturnType<Awaited<ReturnType<typeof getBrowser>>["newPage"]>
  > | null = null;

  try {
    const body = await request.json();
    const html = typeof body.html === "string" ? body.html : "";
    const css = typeof body.css === "string" ? body.css : "";
    const title =
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim()
        : "resume";

    const sanitized = sanitizeHtml(html);
    const fullHtml = buildResumeDocument(sanitized, css);

    const browser = await getBrowser();
    page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "load" });
    await page.evaluateHandle("document.fonts.ready");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    const safeFilename = title.replace(/[^\w\s-]/g, "").trim() || "resume";

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}.pdf"`,
      },
    });
  } catch (error) {
    console.error("POST /api/export-pdf failed:", error);
    const message =
      error instanceof Error ? error.message : "PDF generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    if (page) {
      await page.close();
    }
  }
}
