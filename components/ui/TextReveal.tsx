"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: ElementType;
  once?: boolean;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.045,
  as: Tag = "p",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-80px 0px",
  });

  const words = children.split(" ");

  const Comp = Tag as any;

  return (
    <Comp ref={ref as any} className={cn("overflow-hidden", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-none">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.75,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + i * staggerDelay,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
