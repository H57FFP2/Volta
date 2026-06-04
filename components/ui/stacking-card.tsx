"use client";

import { useTransform, motion, useScroll, type MotionValue } from "framer-motion";
import { useRef } from "react";

export interface StackReason {
  index: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
}

interface CardProps extends StackReason {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export function StackingCard({
  i,
  index,
  title,
  description,
  color,
  textColor,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 px-6"
    >
      <motion.div
        style={{
          backgroundColor: color,
          color: textColor,
          scale,
          top: `calc(-5vh + ${i * 28}px)`,
        }}
        className="relative flex flex-col justify-between h-[520px] md:h-[600px] w-full max-w-6xl rounded-3xl p-10 md:p-16 origin-top overflow-hidden"
      >

        <img
          src="/VOLTAWEB/VOLTAWHITE2.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-8 w-[clamp(16rem,34vw,28rem)] h-auto select-none"
          style={{ opacity: 0.06 }}
        />

        <div className="relative z-10 flex items-center gap-4">
          <span className="font-mono text-[12px] tracking-[0.3em]">{index}</span>
          <span className="h-px w-12" style={{ backgroundColor: textColor, opacity: 0.4 }} />
        </div>

        <div className="relative z-10 max-w-xl">
          <h3 className="font-sans font-black text-[clamp(1.8rem,4vw,3rem)] leading-[1.02] tracking-tight mb-4">
            {title}
          </h3>
          <p className="font-sans text-[15px] md:text-[17px] leading-relaxed" style={{ opacity: 0.85 }}>
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function StackingCards({ reasons }: { reasons: StackReason[] }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container}>
      {reasons.map((reason, i) => {
        const targetScale = 1 - (reasons.length - i) * 0.04;
        return (
          <StackingCard
            key={reason.index}
            i={i}
            {...reason}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
