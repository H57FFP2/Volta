"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Zap } from "lucide-react";

const EASE_EXPO = [0.76, 0, 0.24, 1] as const;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [circle, setCircle] = useState<{ cx: number; cy: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCircle({ cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 });

    setTimeout(() => {
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      window.scrollTo(0, 0);
    }, 480);
    setTimeout(() => setCircle(null), 1150);
  }, []);

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Revenir en haut"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-accent text-bg shadow-lg transition-all duration-300 hover:bg-fg ${
          visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {circle && (
          <motion.div
            className="fixed inset-0 z-[9990] flex items-center justify-center overflow-hidden pointer-events-none"
            style={{ backgroundColor: "var(--accent)" }}
            initial={{ clipPath: `circle(0px at ${circle.cx}px ${circle.cy}px)` }}
            animate={{ clipPath: `circle(170vmax at ${circle.cx}px ${circle.cy}px)` }}
            exit={{
              clipPath: `circle(0px at ${circle.cx}px ${circle.cy}px)`,
              transition: { duration: 0.5, ease: EASE_EXPO },
            }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            <motion.span
              className="select-none"
              style={{ color: "#0f1511" }}
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
            >
              <Zap
                className="w-[clamp(3rem,10vw,7rem)] h-[clamp(3rem,10vw,7rem)]"
                fill="#0f1511"
                stroke="#0f1511"
              />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
