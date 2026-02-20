import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
export function supabaseServer() {
  const cookieStore = cookies() as any;
  const c = {
    get(name: string) {
      return cookieStore.get(name)?.value ?? "";
    },
    set(name: string, value: string, options: any) {
      cookieStore.set({ name, value, ...options });
    },
    remove(name: string, options: any) {
      cookieStore.set({ name, value: "", ...options });
    },
  };
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: c as any,
  });
}
export async function requireAuth() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"));
  }
  return data.user;
}
