import { NextResponse } from "next/server";
import { getProfile } from "@/lib/plan";
export async function GET() {
  const profile = await getProfile();
  if (!profile) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ profile });
}
