"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as: Tag = "button",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
      data-magnetic
    >
      <Tag
        href={href as any}
        onClick={onClick}
        className={cn(
          "relative inline-block transition-colors duration-200",
          className
        )}
        data-hover={isHovered ? "true" : "false"}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
