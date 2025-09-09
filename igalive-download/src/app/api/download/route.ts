import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";

// Placeholder auth: allow all. Replace with real auth integration.
async function ensureAuthorized(): Promise<boolean> {
  return true;
}

export async function GET(req: NextRequest) {
  const authorized = await ensureAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  if (!file || !file.startsWith("/apps/") || file.includes("..")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  const absolutePath = path.join(process.cwd(), "public", file);

  try {
    const stat = await fs.stat(absolutePath);
    if (!stat.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await fs.readFile(absolutePath);
    const fileName = path.basename(absolutePath);

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: new Headers({
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Length": String(stat.size),
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
      }),
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}


