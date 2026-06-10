"use client";

import { useEffect } from "react";
import { getSupabase } from "@/lib/supabase";

// Enregistre une visite (une seule fois par session) dans Supabase.
export function VisitTracker() {
  useEffect(() => {
    // Ne pas compter les visites de l'espace admin
    if (window.location.pathname.startsWith("/dashboard")) return;
    if (sessionStorage.getItem("volta_visit")) return;
    const supabase = getSupabase();
    if (!supabase) return;
    sessionStorage.setItem("volta_visit", "1");
    supabase
      .from("site_visits")
      .insert({})
      .then(({ error }) => {
        if (error) console.error("Visit track error:", error.message);
      });
  }, []);

  return null;
}
