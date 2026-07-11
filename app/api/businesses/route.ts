import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Business } from "@/types";

const DATA_FILE = path.join(process.cwd(), "data", "businesses.local.json");

function readLocal(): Business[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    return [];
  }
  return [];
}

function writeLocal(data: Business[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Solo disponible en desarrollo (npm run dev)" },
      { status: 403 },
    );
  }
  const businesses = readLocal();
  return NextResponse.json(businesses);
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Solo disponible en desarrollo (npm run dev)" },
      { status: 403 },
    );
  }
  try {
    const body = (await req.json()) as Business;
    const businesses = readLocal();
    const idx = businesses.findIndex((b) => b.id === body.id);
    if (idx >= 0) {
      businesses[idx] = body;
    } else {
      businesses.push(body);
    }
    writeLocal(businesses);
    return NextResponse.json({ success: true, business: body });
  } catch (e) {
    return NextResponse.json(
      { error: "Error al guardar: " + (e as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Solo disponible en desarrollo (npm run dev)" },
      { status: 403 },
    );
  }
  try {
    const { id } = await req.json();
    const businesses = readLocal().filter((b) => b.id !== id);
    writeLocal(businesses);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Error al eliminar: " + (e as Error).message },
      { status: 500 },
    );
  }
}
