import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { STARTER_CSS, STARTER_HTML } from "@/lib/templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const html = typeof body.html === "string" ? body.html : STARTER_HTML;
    const css = typeof body.css === "string" ? body.css : STARTER_CSS;
    const title =
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim()
        : "Untitled Resume";

    const resume = await prisma.resume.create({
      data: { html, css, title },
    });

    return NextResponse.json({ id: resume.id });
  } catch (error) {
    console.error("POST /api/resume failed:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    const resume = await prisma.resume.findUnique({ where: { id } });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: resume.id,
      title: resume.title,
      html: resume.html,
      css: resume.css,
    });
  } catch (error) {
    console.error("GET /api/resume failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}
