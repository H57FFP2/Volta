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

export interface ContactRequest {
  id: string;
  created_at: string;
  firstname: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  business_type: string | null;
  message: string;
  read: boolean | null;
  status: string | null;
}

export interface DashboardStats {
  visits: number;
  visitsToday: number;
  visitsLastHour: number;
  totalRequests: number;
  unread: number;
  error?: string;
}

const EMPTY_STATS: DashboardStats = {
  visits: 0,
  visitsToday: 0,
  visitsLastHour: 0,
  totalRequests: 0,
  unread: 0,
};

// Statistiques générales (visites total/jour/heure, demandes, non lues)
export async function getStats(): Promise<DashboardStats> {
  if (!(await isAuthed())) return EMPTY_STATS;
  const supabase = getSupabaseAdmin();
  if (!supabase) return { ...EMPTY_STATS, error: "Supabase non configuré." };

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const lastHour = new Date(now.getTime() - 60 * 60 * 1000).toISOString();

  const [visitsRes, todayRes, hourRes, totalRes, unreadRes] = await Promise.all([
    supabase.from("site_visits").select("*", { count: "exact", head: true }),
    supabase.from("site_visits").select("*", { count: "exact", head: true }).gte("created_at", startOfDay),
    supabase.from("site_visits").select("*", { count: "exact", head: true }).gte("created_at", lastHour),
    supabase.from("contact_requests").select("*", { count: "exact", head: true }),
    supabase.from("contact_requests").select("*", { count: "exact", head: true }).eq("read", false),
  ]);

  const error =
    visitsRes.error?.message ||
    todayRes.error?.message ||
    hourRes.error?.message ||
    totalRes.error?.message ||
    unreadRes.error?.message ||
    undefined;

  return {
    visits: visitsRes.count ?? 0,
    visitsToday: todayRes.count ?? 0,
    visitsLastHour: hourRes.count ?? 0,
    totalRequests: totalRes.count ?? 0,
    unread: unreadRes.count ?? 0,
    error,
  };
}

// Liste complète des demandes (les plus récentes d'abord)
export async function getRequests(): Promise<ContactRequest[]> {
  if (!(await isAuthed())) return [];
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as ContactRequest[]) ?? [];
}

// Marque toutes les demandes comme lues (remet le compteur de nouvelles à 0)
export async function markAllRead() {
  if (!(await isAuthed())) return;
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase.from("contact_requests").update({ read: true }).eq("read", false);
}

// Met à jour le statut de suivi d'une demande
export async function updateStatus(id: string, status: string) {
  if (!(await isAuthed())) return;
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase.from("contact_requests").update({ status }).eq("id", id);
}
