"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 22 + 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 700);
          }, 200);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
        >

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className="font-sans text-[clamp(3rem,10vw,8rem)] text-fg font-black tracking-tight">
              {siteConfig.studio.name}
            </span>
            <span className="absolute -top-3 -right-4 w-2 h-2 rounded-full bg-accent" />
          </motion.div>

          <div className="mt-16 w-48 h-px bg-[var(--border-color)] relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            className="mt-4 font-mono text-[10px] text-muted-fg tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
