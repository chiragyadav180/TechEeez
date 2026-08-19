"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className = "",
  strength = 6,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setOffset({
      x: Math.max(-strength, Math.min(strength, x * 0.2)),
      y: Math.max(-strength, Math.min(strength, y * 0.2)),
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onTouchStart={() => setIsTouch(true)}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
