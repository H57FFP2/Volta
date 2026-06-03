import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { login, logout, isAuthed } from "./actions";
import { DeleteRequestButton } from "./DeleteRequestButton";

export const dynamic = "force-dynamic";

interface ContactRequest {
  id: string;
  created_at: string;
  firstname: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  business_type: string | null;
  message: string;
}

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
            <p className="font-sans text-[13px] text-[var(--accent-warm)]">
              Mot de passe incorrect.
            </p>
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

  const supabase = getSupabaseAdmin();
  let requests: ContactRequest[] = [];
  let dbError = "";

  if (!supabase) {
    dbError = "Supabase non configuré (vérifie les variables d'environnement).";
  } else {
    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) dbError = error.message;
    else requests = (data as ContactRequest[]) ?? [];
  }

  return (
    <main className="min-h-screen bg-bg px-6 md:px-10 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-2">
              Dashboard
            </p>
            <h1 className="font-sans font-black text-3xl text-fg">
              Demandes de contact
              <span className="ml-3 font-mono text-base text-muted-fg">
                ({requests.length})
              </span>
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="font-mono text-[11px] uppercase tracking-widest text-muted-fg hover:text-fg transition-colors"
            >
              Déconnexion
            </button>
          </form>
        </div>

        {dbError && (
          <p className="rounded-lg border border-[var(--accent-warm)]/40 bg-[var(--accent-warm)]/10 px-4 py-3 font-sans text-[14px] text-[var(--accent-warm)] mb-8">
            {dbError}
          </p>
        )}

        {!dbError && requests.length === 0 && (
          <p className="font-sans text-muted-fg">Aucune demande pour l&apos;instant.</p>
        )}

        <div className="space-y-4">
          {requests.map((r) => (
            <article
              key={r.id}
              className="rounded-xl border border-[var(--border-color)] bg-muted/40 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="font-sans font-black text-lg text-fg">
                  {[r.firstname, r.name].filter(Boolean).join(" ") || r.name}
                  {r.company && (
                    <span className="ml-3 font-sans font-normal text-base text-muted-fg">
                      · {r.company}
                    </span>
                  )}
                </h2>
                <div className="flex items-center gap-4">
                  <time className="font-mono text-[11px] text-muted-fg">
                    {new Date(r.created_at).toLocaleString("fr-CA")}
                  </time>
                  <DeleteRequestButton id={r.id} name={[r.firstname, r.name].filter(Boolean).join(" ") || r.name} />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mb-4 font-mono text-[12px] text-muted-fg">
                <a href={`mailto:${r.email}`} className="hover:text-accent transition-colors">
                  {r.email}
                </a>
                {r.phone && (
                  <a href={`tel:${r.phone}`} className="hover:text-accent transition-colors">
                    {r.phone}
                  </a>
                )}
                {r.business_type && (
                  <span className="rounded-full border border-[var(--border-color)] px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                    {r.business_type}
                  </span>
                )}
              </div>
              <p className="font-sans text-[15px] text-fg/90 leading-relaxed whitespace-pre-wrap">
                {r.message}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
