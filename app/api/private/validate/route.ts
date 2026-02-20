import { NextResponse } from "next/server";
import { requireActivePlan } from "@/lib/plan";
export async function GET() {
  const res = await requireActivePlan();
  if ("headers" in res) return res as any;
  return NextResponse.json({ ok: true });
}
