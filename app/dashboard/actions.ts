"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const COOKIE = "volta_dash";

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");
  const expected = process.env.DASHBOARD_PASSWORD;

  if (!expected) {
    redirect("/dashboard?error=config");
  }
  if (password !== expected) {
    redirect("/dashboard?error=wrong");
  }

  const store = await cookies();
  store.set(COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/dashboard",
    maxAge: 60 * 60 * 8,
  });
  redirect("/dashboard");
}

export async function logout() {
  const store = await cookies();
  store.delete(COOKIE);
  redirect("/dashboard");
}

export async function isAuthed(): Promise<boolean> {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return false;
  const store = await cookies();
  return store.get(COOKIE)?.value === expected;
}

export async function deleteRequest(id: string) {
  if (!(await isAuthed())) return;
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase.from("contact_requests").delete().eq("id", id);
  revalidatePath("/dashboard");
}
