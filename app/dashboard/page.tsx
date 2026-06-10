import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { login, isAuthed, getStats, getRequests } from "./actions";
import { DashboardApp } from "./DashboardApp";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authed = await isAuthed();
  const params = await searchParams;

  if (!authed) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-6">
        <form
          action={login}
          className="w-full max-w-sm rounded-2xl border border-[var(--border-color)] bg-muted/40 p-8 flex flex-col gap-5"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-2">
              Espace privé
            </p>
            <h1 className="font-sans font-black text-2xl text-fg">Dashboard</h1>
          </div>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-fg">
              Mot de passe
            </span>
            <input
              name="password"
              type="password"
              required
              autoFocus
              className="rounded-lg border border-[var(--border-color)] bg-bg px-4 py-3 font-sans text-fg outline-none focus:border-accent transition-colors"
            />
          </label>

          {params.error === "wrong" && (
            <p className="font-sans text-[13px] text-[var(--accent-warm)]">Mot de passe incorrect.</p>
          )}
          {params.error === "config" && (
            <p className="font-sans text-[13px] text-[var(--accent-warm)]">
              DASHBOARD_PASSWORD n&apos;est pas configuré.
            </p>
          )}

          <button
            type="submit"
            className="rounded-full bg-accent text-bg px-6 py-3 font-sans font-bold text-[13px] uppercase tracking-[0.15em] hover:bg-fg transition-colors"
          >
            Se connecter
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-fg hover:text-fg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Retour au site
          </Link>
        </form>
      </main>
    );
  }

  const [stats, requests] = await Promise.all([getStats(), getRequests()]);

  return <DashboardApp initialStats={stats} initialRequests={requests} />;
}
