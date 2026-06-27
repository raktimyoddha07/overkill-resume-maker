import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function GET() {
  try {
    ensureUploadsDir();
    const files = fs.readdirSync(UPLOADS_DIR);
    const assets = files.map((filename) => {
      const filePath = path.join(UPLOADS_DIR, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        url: `/api/uploads/${encodeURIComponent(filename)}`,
        size: stats.size,
        createdAt: stats.birthtimeMs,
      };
    });
    assets.sort((a, b) => b.createdAt - a.createdAt);
    return NextResponse.json({ assets });
  } catch (error) {
    console.error("Failed to list assets:", error);
    return NextResponse.json({ error: "Failed to list assets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureUploadsDir();
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const originalName = file.name || "image.png";
    const ext = path.extname(originalName) || ".png";
    const baseName = path.basename(originalName, ext).replace(/[^\w-]/g, "_");
    const timestamp = Date.now();
    const filename = `${baseName}_${timestamp}${ext.toLowerCase()}`;
    const targetPath = path.join(UPLOADS_DIR, filename);

    fs.writeFileSync(targetPath, buffer);

    return NextResponse.json({
      success: true,
      asset: {
        filename,
        url: `/api/uploads/${encodeURIComponent(filename)}`,
        size: buffer.length,
      },
    });
  } catch (error) {
    console.error("Failed to upload asset:", error);
    return NextResponse.json({ error: "Failed to upload asset" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    ensureUploadsDir();
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json({ error: "Filename required" }, { status: 400 });
    }

    const safeFilename = path.basename(filename);
    const filePath = path.join(UPLOADS_DIR, safeFilename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete asset:", error);
    return NextResponse.json({ error: "Failed to delete asset" }, { status: 500 });
  }
}
