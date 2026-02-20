import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userCookie = req.cookies.get("vagaspro_user")?.value;
    if (!userCookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    const user = JSON.parse(userCookie);
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
