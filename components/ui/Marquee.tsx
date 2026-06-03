"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: string;
  speed?: "slow" | "normal" | "fast";
  inverted?: boolean;
}

const speedMap = {
  slow: 0.4,
  normal: 0.7,
  fast: 1.2,
};

export function Marquee({
  items,
  className,
  separator = "·",
  speed = "normal",
  inverted = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const baseWidth = useRef(0);
  const [repeat, setRepeat] = useState(2);
  const x = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!baseRef.current || !containerRef.current) return;
      const w = baseRef.current.scrollWidth;
      if (!w) return;
      baseWidth.current = w;
      const containerW = containerRef.current.offsetWidth;
      const needed = Math.ceil(containerW / w) + 1;
      setRepeat(Math.max(2, needed));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  useAnimationFrame(() => {
    const w = baseWidth.current;
    if (!w) return;
    const dir = inverted ? 1 : -1;
    let next = x.get() + dir * speedMap[speed];
    if (next <= -w) next += w;
    if (next > 0) next -= w;
    x.set(next);
  });

  const renderSet = (keyPrefix: string) =>
    items.map((item, i) => (
      <span key={`${keyPrefix}-${i}`} className="inline-flex items-center">
        <span className="px-6 font-sans font-semibold uppercase tracking-[0.15em] text-sm">
          {item}
        </span>
        <span className="text-accent opacity-60 text-xs">{separator}</span>
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap select-none", className)}
    >
      <motion.div style={{ x }} className="flex w-max">

        <div ref={baseRef} className="flex shrink-0">
          {renderSet("base")}
        </div>

        {Array.from({ length: repeat - 1 }).map((_, c) => (
          <div key={c} className="flex shrink-0" aria-hidden="true">
            {renderSet(`copy-${c}`)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
