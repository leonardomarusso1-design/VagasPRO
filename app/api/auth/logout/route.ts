import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = NextResponse.redirect(baseUrl);
  res.cookies.set("vagaspro_user", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
