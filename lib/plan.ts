import { supabaseServer } from "./auth";
import { NextResponse } from "next/server";
export async function getProfile() {
  const supabase = supabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("id,email,full_name,avatar_url,plan,plan_status,mercadopago_customer_id,mercadopago_subscription_id")
    .eq("id", auth.user.id)
    .single();
  return data;
}
export async function requireActivePlan() {
  const profile = await getProfile();
  if (!profile) {
    return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"));
  }
  if (profile.plan_status !== "active") {
    return NextResponse.redirect(new URL("/?checkout=true", process.env.NEXTAUTH_URL || "http://localhost:3000"));
  }
  return profile;
}
