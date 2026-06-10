"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  RefreshCw,
  Trash2,
  LogOut,
  Eye,
  Users,
  Loader2,
  CalendarDays,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  getStats,
  getRequests,
  markAllRead,
  deleteRequest,
  updateStatus,
  logout,
  type ContactRequest,
  type DashboardStats,
} from "./actions";

type Tab = "stats" | "demandes" | "travaux";
const REFRESH_MS = 15 * 60 * 1000; // 15 min

// Statuts de suivi des demandes (valeur stockée + libellé + couleur)
const STATUSES = [
  { value: "nouveau", label: "Nouveau", color: "#627a68" },
  { value: "en_cours", label: "En cours", color: "#B8FF2E" },
  { value: "a_rappeler", label: "À rappeler", color: "#FF4A28" },
  { value: "faire_call", label: "Faire un call", color: "#7B6EE8" },
  { value: "attente_paiement", label: "Attente de paiement", color: "#e8b53a" },
  { value: "paiement_recu", label: "Paiement reçu", color: "#3a9d5a" },
  { value: "fini", label: "Fini", color: "#8a8f8a" },
];
const statusOf = (v: string | null) => STATUSES.find((s) => s.value === v) ?? STATUSES[0];

export function DashboardApp({
  initialStats,
  initialRequests,
}: {
  initialStats: DashboardStats;
  initialRequests: ContactRequest[];
}) {
  const [tab, setTab] = useState<Tab>("stats");
  const [stats, setStats] = useState(initialStats);
  const [requests, setRequests] = useState(initialRequests);
  const [refreshing, setRefreshing] = useState(false);

  const refreshStats = useCallback(async () => {
    setRefreshing(true);
    try {
      setStats(await getStats());
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Auto-refresh des stats toutes les 15 min
  useEffect(() => {
    const id = setInterval(refreshStats, REFRESH_MS);
    return () => clearInterval(id);
  }, [refreshStats]);

  // À l'ouverture de l'onglet Demandes : tout marquer comme lu
  useEffect(() => {
    if (tab !== "demandes") return;
    let cancelled = false;
    (async () => {
      await markAllRead();
      const [r, s] = await Promise.all([getRequests(), getStats()]);
      if (cancelled) return;
      setRequests(r);
      setStats(s);
    })();
    return () => {
      cancelled = true;
    };
  }, [tab]);

  return (
    <main className="min-h-screen bg-bg flex">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-60 shrink-0 border-r border-[var(--border-color)] bg-muted/30 flex flex-col p-5 sticky top-0 h-screen">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-1">Dashboard</p>
          <p className="font-sans font-black text-fg text-lg">{siteConfig.studio.name}</p>
        </div>

        <nav className="flex flex-col gap-1">
          <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label="Statistiques" active={tab === "stats"} onClick={() => setTab("stats")} />
          <SidebarItem
            icon={<Inbox className="w-4 h-4" />}
            label="Demandes"
            active={tab === "demandes"}
            onClick={() => setTab("demandes")}
            badge={stats.unread > 0 ? stats.unread : undefined}
          />
          <SidebarItem icon={<Briefcase className="w-4 h-4" />} label="Travaux" active={tab === "travaux"} onClick={() => setTab("travaux")} />
        </nav>

        <form action={logout} className="mt-auto">
          <button
            type="submit"
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-fg hover:text-fg hover:bg-bg/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </form>
      </aside>

      {/* ── Contenu ─────────────────────────────────────────── */}
      <section className="flex-1 px-6 md:px-10 py-10 overflow-x-hidden">
        {tab === "stats" && <StatsView stats={stats} refreshing={refreshing} onRefresh={refreshStats} />}
        {tab === "demandes" && <RequestsView requests={requests} onChange={setRequests} onStats={setStats} />}
        {tab === "travaux" && <WorksView />}
      </section>
    </main>
  );
}

function SidebarItem({
  icon, label, active, onClick, badge,
}: {
  icon: React.ReactNode; label: string; active: boolean; onClick: () => void; badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-[14px] transition-colors ${
        active ? "bg-accent/10 text-accent" : "text-muted-fg hover:text-fg hover:bg-bg/60"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && (
        <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-accent text-bg font-mono text-[10px] font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}

// ── Vue Statistiques ──────────────────────────────────────────
function StatsView({ stats, refreshing, onRefresh }: { stats: DashboardStats; refreshing: boolean; onRefresh: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-sans font-black text-3xl text-fg">Statistiques</h1>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-fg hover:text-fg hover:border-accent transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Actualiser
        </button>
      </div>

      {stats.error && (
        <p className="rounded-lg border border-[var(--accent-warm)]/40 bg-[var(--accent-warm)]/10 px-4 py-3 font-sans text-[14px] text-[var(--accent-warm)] mb-6">
          {stats.error}
        </p>
      )}

      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-fg mb-4">Visites</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <StatCard icon={<Users className="w-5 h-5" />} value={stats.visits} label="Total" />
        <StatCard icon={<CalendarDays className="w-5 h-5" />} value={stats.visitsToday} label="Aujourd'hui" />
        <StatCard icon={<Clock className="w-5 h-5" />} value={stats.visitsLastHour} label="Dernière heure" />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-fg mb-4">Demandes</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <StatCard icon={<Inbox className="w-5 h-5" />} value={stats.totalRequests} label="Demandes totales" />
        <StatCard icon={<Eye className="w-5 h-5" />} value={stats.unread} label="Nouvelles (non lues)" highlight={stats.unread > 0} />
      </div>

      <p className="mt-6 font-mono text-[11px] text-muted-fg">
        Les visites s&apos;actualisent automatiquement toutes les 15 min, ou via le bouton Actualiser.
      </p>
    </div>
  );
}

function StatCard({ icon, value, label, highlight }: { icon: React.ReactNode; value: number; label: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl border bg-muted/40 p-6 flex flex-col gap-3 ${
        highlight ? "border-accent" : "border-[var(--border-color)]"
      }`}
    >
      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${highlight ? "bg-accent text-bg" : "bg-bg text-accent"}`}>
        {icon}
      </span>
      <span className="font-sans font-black text-4xl text-fg tabular-nums">{value}</span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-fg">{label}</span>
    </div>
  );
}

// ── Vue Demandes ──────────────────────────────────────────────
function RequestsView({
  requests, onChange, onStats,
}: {
  requests: ContactRequest[];
  onChange: (r: ContactRequest[]) => void;
  onStats: (s: DashboardStats) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setPendingId(id);
    startTransition(async () => {
      await deleteRequest(id);
      const [r, s] = await Promise.all([getRequests(), getStats()]);
      onChange(r);
      onStats(s);
      setPendingId(null);
    });
  };

  const handleStatus = (id: string, status: string) => {
    // Mise à jour optimiste
    onChange(requests.map((r) => (r.id === id ? { ...r, status } : r)));
    updateStatus(id, status);
  };

  return (
    <div>
      <h1 className="font-sans font-black text-3xl text-fg mb-8">
        Demandes <span className="font-mono text-base text-muted-fg">({requests.length})</span>
      </h1>

      {requests.length === 0 && <p className="font-sans text-muted-fg">Aucune demande pour l&apos;instant.</p>}

      <div className="space-y-4 max-w-4xl">
        {requests.map((r) => (
          <article key={r.id} className="rounded-xl border border-[var(--border-color)] bg-muted/40 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 className="font-sans font-black text-lg text-fg">
                {[r.firstname, r.name].filter(Boolean).join(" ") || r.name}
                {r.company && <span className="ml-3 font-sans font-normal text-base text-muted-fg">· {r.company}</span>}
              </h2>
              <div className="flex items-center gap-3">
                {/* Sélecteur de statut */}
                <div
                  className="relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                  style={{ borderColor: statusOf(r.status).color }}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: statusOf(r.status).color }} />
                  <select
                    value={statusOf(r.status).value}
                    onChange={(e) => handleStatus(r.id, e.target.value)}
                    className="appearance-none bg-transparent pr-4 font-mono text-[11px] uppercase tracking-widest text-fg outline-none cursor-pointer [&>option]:bg-bg [&>option]:text-fg [&>option]:normal-case"
                    style={{ color: statusOf(r.status).color }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <time className="font-mono text-[11px] text-muted-fg hidden sm:inline">{new Date(r.created_at).toLocaleString("fr-CA")}</time>
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={isPending && pendingId === r.id}
                  aria-label="Supprimer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] text-muted-fg hover:text-[var(--accent-warm)] hover:border-[var(--accent-warm)] transition disabled:opacity-50"
                >
                  {isPending && pendingId === r.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mb-4 font-mono text-[12px] text-muted-fg">
              <a href={`mailto:${r.email}`} className="hover:text-accent transition-colors">{r.email}</a>
              {r.phone && <a href={`tel:${r.phone}`} className="hover:text-accent transition-colors">{r.phone}</a>}
              {r.business_type && (
                <span className="rounded-full border border-[var(--border-color)] px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                  {r.business_type}
                </span>
              )}
            </div>
            <p className="font-sans text-[15px] text-fg/90 leading-relaxed whitespace-pre-wrap">{r.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// ── Vue Travaux ───────────────────────────────────────────────
function WorksView() {
  return (
    <div>
      <h1 className="font-sans font-black text-3xl text-fg mb-8">Travaux</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
        {siteConfig.works.map((w) => (
          <div key={w.id} className="rounded-xl border border-[var(--border-color)] bg-muted/40 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-sans font-black text-lg text-fg">{w.title}</h2>
              <span className="font-mono text-[11px] text-muted-fg">{w.year}</span>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-fg mb-4">{w.category}</p>
            {"url" in w && (w as { url?: string }).url && (
              <a
                href={(w as { url?: string }).url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-accent hover:text-fg transition-colors break-all"
              >
                {(w as { url?: string }).url}
              </a>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] text-muted-fg">
        Les projets sont gérés dans config/site.ts (works).
      </p>
    </div>
  );
}
