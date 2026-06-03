"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteRequest } from "./actions";

export function DeleteRequestButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteRequest(id);
    });
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] text-muted-fg hidden sm:inline">
          Supprimer la demande de {name} ?
        </span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-warm)] text-bg px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest hover:brightness-110 transition disabled:opacity-60"
        >
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
          Confirmer
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="rounded-full border border-[var(--border-color)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-fg hover:text-fg transition"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      aria-label="Supprimer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] text-muted-fg hover:text-[var(--accent-warm)] hover:border-[var(--accent-warm)] transition"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
