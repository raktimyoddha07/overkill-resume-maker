import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await request.json();
    const data: { html?: string; css?: string; title?: string } = {};

    if (typeof body.html === "string") data.html = body.html;
    if (typeof body.css === "string") data.css = body.css;
    if (typeof body.title === "string") data.title = body.title.trim() || "Untitled Resume";

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const resume = await prisma.resume.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      id: resume.id,
      title: resume.title,
      html: resume.html,
      css: resume.css,
    });
  } catch (error) {
    console.error(`PATCH /api/resume/${id} failed:`, error);
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}
