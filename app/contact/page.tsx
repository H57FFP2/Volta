"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowLeft, Check, Loader2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLang } from "@/lib/language-context";
import { getSupabase } from "@/lib/supabase";
import { Footer } from "@/components/layout/Footer";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .73-5.07V9.66a5.66 5.66 0 0 0-.73-.05A5.69 5.69 0 1 0 15.46 15V8.9a7.3 7.3 0 0 0 4.27 1.37V7.16a4.28 4.28 0 0 1-3.13-1.34z" />
    </svg>
  );
}

const EASE = [0.33, 1, 0.68, 1] as const;
type Status = "idle" | "loading" | "success" | "error";

function isValidPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s.\-()/]/g, "");
  return /^\+?\d{8,15}$/.test(cleaned);
}

export default function ContactPage() {
  const { t } = useLang();
  const c = t.contactPage;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstname: String(data.get("firstname") || "").trim(),
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim() || null,
      company: String(data.get("company") || "").trim() || null,
      business_type: String(data.get("business_type") || "").trim() || null,
      message: String(data.get("message") || "").trim(),
    };

    if (payload.phone && !isValidPhone(payload.phone)) {
      setPhoneError(c.phoneError);
      return;
    }
    setPhoneError("");
    setStatus("loading");
    setErrorMsg("");

    const supabase = getSupabase();
    if (!supabase) {
      setStatus("error");
      setErrorMsg(c.notConfigured);
      return;
    }

    const { error } = await supabase.from("contact_requests").insert(payload);
    if (error) {
      console.error("Supabase insert error:", error);
      setStatus("error");
      setErrorMsg(c.genericError);
      return;
    }

    setStatus("success");
    form.reset();
  };

  const channels = [
    { icon: <Mail className="w-5 h-5" />, label: c.channels.email, value: siteConfig.studio.email, href: `mailto:${siteConfig.studio.email}`, external: false },
    { icon: <Phone className="w-5 h-5" />, label: c.channels.phone, value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`, external: false },
    { icon: <InstagramIcon className="w-5 h-5" />, label: c.channels.instagram, value: siteConfig.contact.instagram.handle, href: siteConfig.contact.instagram.url, external: true },
    { icon: <TikTokIcon className="w-5 h-5" />, label: "TikTok", value: siteConfig.contact.tiktok.handle, href: siteConfig.contact.tiktok.url, external: true },
  ];

  return (
    <>
      <main className="relative min-h-screen bg-bg px-6 md:px-10 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-fg hover:text-fg transition-colors duration-200 mb-16"
        >
          <ArrowLeft className="w-4 h-4" />
          {c.back}
        </Link>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-6">{c.eyebrow}</p>
            <h1 className="font-sans font-black text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-fg mb-6">
              {c.headline}
            </h1>
            <p className="font-sans text-[1.05rem] text-muted-fg leading-relaxed max-w-md mb-12">{c.subline}</p>

            <div className="space-y-3">
              {channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-[var(--border-color)] bg-muted/40 px-5 py-4 transition-colors duration-200 hover:border-accent"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-bg text-accent shrink-0">{ch.icon}</span>
                  <span className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-fg">{ch.label}</span>
                    <span className="font-sans font-semibold text-fg group-hover:text-accent transition-colors duration-200">{ch.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center min-h-[420px] gap-5 rounded-2xl border border-[var(--border-color)] bg-muted/40 p-10">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-bg">
                  <Check className="w-8 h-8" />
                </span>
                <h2 className="font-sans font-black text-2xl text-fg">{c.successTitle}</h2>
                <p className="font-sans text-muted-fg max-w-xs">{c.successText}</p>
                <button onClick={() => setStatus("idle")} className="mt-2 font-mono text-[11px] uppercase tracking-widest text-accent hover:text-fg transition-colors">
                  {c.successAgain}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 border-b border-[var(--border-color)] pb-8">
                  <LineField num="01" label={c.fields.firstname} name="firstname" type="text" placeholder="Jean" required />
                  <LineField num="02" label={c.fields.name} name="name" type="text" placeholder="Dupont" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 border-b border-[var(--border-color)] py-8">
                  <LineField num="03" label={c.fields.email} name="email" type="email" placeholder="jean@entreprise.com" required />
                  <LineField num="04" label={c.fields.phone} name="phone" type="tel" placeholder="+1 514 555 0123" error={phoneError} onChange={() => phoneError && setPhoneError("")} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 border-b border-[var(--border-color)] py-8">
                  <LineField num="05" label={c.fields.company} name="company" type="text" placeholder="Studio Acme" />
                  <LineSelect num="06" label={c.fields.businessType} name="business_type" options={c.businessTypes} placeholder={c.selectPlaceholder} />
                </div>
                <div className="py-8">
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-fg mb-3">
                    <span className="text-accent">07</span> {c.fields.project}
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full resize-none bg-transparent border-b border-[var(--border-color)] pb-3 font-sans text-[clamp(1.1rem,2vw,1.4rem)] text-fg placeholder:text-muted-fg/40 outline-none focus:border-accent transition-colors duration-200"
                  />
                </div>

                {status === "error" && <p className="font-sans text-[13px] text-[var(--accent-warm)] mb-4">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group mt-2 self-start inline-flex items-center gap-3 rounded-full bg-accent text-bg px-9 py-4 font-sans font-bold text-[13px] uppercase tracking-[0.15em] hover:bg-fg transition-colors duration-300 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {c.sending}
                    </>
                  ) : (
                    <>
                      {c.submit}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function LineField({
  num, label, name, type, placeholder, required, error, onChange,
}: {
  num: string; label: string; name: string; type: string;
  placeholder?: string; required?: boolean; error?: string; onChange?: () => void;
}) {
  return (
    <label className="flex flex-col">
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-fg mb-3">
        <span className="text-accent">{num}</span> {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={!!error}
        className="bg-transparent border-b pb-2 font-sans text-[clamp(1.1rem,2vw,1.4rem)] text-fg placeholder:text-muted-fg/40 outline-none transition-colors duration-200 focus:border-accent"
        style={{ borderColor: error ? "var(--accent-warm)" : "var(--border-color)" }}
      />
      {error && <span className="mt-2 font-sans text-[12px] text-[var(--accent-warm)]">{error}</span>}
    </label>
  );
}

function LineSelect({
  num, label, name, options, placeholder,
}: {
  num: string; label: string; name: string; options: string[]; placeholder: string;
}) {
  return (
    <label className="flex flex-col">
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-fg mb-3">
        <span className="text-accent">{num}</span> {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="bg-transparent border-b border-[var(--border-color)] pb-2 font-sans text-[clamp(1.1rem,2vw,1.4rem)] text-fg outline-none transition-colors duration-200 focus:border-accent cursor-pointer [&>option]:bg-bg [&>option]:text-fg"
      >
        <option value="" disabled className="text-muted-fg">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
