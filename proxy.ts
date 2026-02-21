import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
export async function proxy(req: NextRequest) {
  const url = new URL(req.url);
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value ?? "";
      },
      set() {},
      remove() {},
    },
  });
  const { data } = await supabase.auth.getUser();
  const isPrivate = url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/api/private");
  if (isPrivate && !data.user) {
    return NextResponse.redirect(new URL("/", url.origin));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/api/private/:path*"],
};
