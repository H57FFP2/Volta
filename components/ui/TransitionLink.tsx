"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TransitionLinkProps {
  href: string;
  color?: string;
  label?: string; // texte affiché dans le circle-expand (sinon dérivé du href)
  className?: string;
  children: React.ReactNode;
}

const EASE_EXPO = [0.76, 0, 0.24, 1] as const;
const EASE_OUT  = [0.33, 1, 0.68, 1] as const;

export function TransitionLink({
  href,
  color = "var(--accent)",
  label,
  className,
  children,
}: TransitionLinkProps) {
  const [circle, setCircle] = useState<{ cx: number; cy: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      setCircle({ cx, cy });

      window.dispatchEvent(new Event("volta:expandHero"));

      setTimeout(() => {
        const target = href.startsWith("#") ? href.slice(1) : href;
        const el = document.getElementById(target);
        if (el) window.scrollTo({ top: el.offsetTop });
      }, 480);

      setTimeout(() => setCircle(null), 1200);
    },
    [href]
  );

  const sectionId = href.startsWith("#") ? href.slice(1) : href;

  return (
    <>
      <a
        href={`#${sectionId}`}
        onClick={handleClick}
        className={cn(className)}
      >
        {children}
      </a>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {circle && (
              <motion.div
                className="fixed top-0 left-0 w-screen z-[99999] flex items-center justify-center overflow-hidden pointer-events-none"
                style={{ backgroundColor: color, height: "160vh" }}
                initial={{ clipPath: `circle(0px at ${circle.cx}px ${circle.cy}px)` }}
                animate={{ clipPath: `circle(260vmax at ${circle.cx}px ${circle.cy}px)` }}
                exit={{
                  clipPath: `circle(0px at ${circle.cx}px ${circle.cy}px)`,
                  transition: { duration: 0.5, ease: EASE_EXPO },
                }}
                transition={{ duration: 0.7, ease: EASE_EXPO }}
              >
                <motion.span
                  className="font-sans font-black uppercase tracking-[0.08em] select-none"
                  style={{ color: "#0f1511", fontSize: "clamp(3rem, 10vw, 8rem)" }}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.22, duration: 0.42, ease: EASE_OUT }}
                >
                  {label ??
                    (sectionId === "works" ? "Travaux" :
                     sectionId === "services" ? "Services" :
                     sectionId === "contact" ? "Contact" :
                     sectionId === "process" ? "Processus" : sectionId)}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
