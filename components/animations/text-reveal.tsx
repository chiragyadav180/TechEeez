"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
} as const;

export function TextReveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
