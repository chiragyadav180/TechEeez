"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Service } from "@/lib/services";

const BUILD_STEPS: Record<Service["slug"], string[]> = {
  "ai-solutions": ["Laying neural layers", "Connecting the model", "Intelligence online"],
  "web-development": ["Raising the frame", "Assembling the pages", "Website live"],
  "mobile-development": ["Forming the device", "Building the screens", "App ready"],
  "cloud-solutions": ["Stacking the servers", "Provisioning the cloud", "Infrastructure live"],
  "data-analytics": ["Collecting the data", "Raising the insights", "Dashboard live"],
  cybersecurity: ["Raising the shield", "Locking every layer", "Systems protected"],
  "system-integration": ["Placing the modules", "Connecting the APIs", "Workflows linked"],
};

type HeroBuildOverlayProps = {
  service: Service;
  reducedMotion: boolean;
  playKey: number;
};

function Floors({ accent, reducedMotion }: { accent: string; reducedMotion: boolean }) {
  return (
    <div className="absolute inset-x-[18%] bottom-[18%] flex h-[54%] items-end justify-between gap-2">
      {[46, 70, 58, 84, 62].map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          initial={reducedMotion ? { height: `${height}%` } : { height: "0%" }}
          animate={{ height: `${height}%` }}
          transition={{
            duration: 0.7,
            delay: 0.12 + index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex-1 rounded-sm"
          style={{
            background: `linear-gradient(to top, ${accent}99, ${accent}22)`,
            boxShadow: `0 0 18px ${accent}44`,
          }}
        />
      ))}
    </div>
  );
}

function ServiceStructure({
  slug,
  accent,
  reducedMotion,
}: {
  slug: Service["slug"];
  accent: string;
  reducedMotion: boolean;
}) {
  const draw = {
    initial: reducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.2 },
    animate: { pathLength: 1, opacity: 1 },
  };

  if (slug === "cloud-solutions") {
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        {[36, 84, 132].map((x, i) => (
          <motion.rect
            key={x}
            x={x}
            width="28"
            rx="3"
            fill={accent}
            fillOpacity="0.35"
            stroke={accent}
            strokeWidth="1.2"
            initial={reducedMotion ? { y: 118, height: 42 } : { y: 160, height: 0 }}
            animate={{ y: 118 - i * 4, height: 42 + i * 6 }}
            transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        <motion.path
          d="M58 96c0-16 14-28 32-28 6-18 28-28 46-18 18-8 40 2 44 22 16 2 28 16 28 32 0 18-16 32-36 32H78c-12 0-20-10-20-22z"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          {...draw}
          transition={{ duration: 1.1, delay: 0.45 }}
        />
      </svg>
    );
  }

  if (slug === "web-development") {
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <motion.rect
          x="28"
          y="40"
          width="144"
          height="112"
          rx="8"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          {...draw}
          transition={{ duration: 0.7 }}
        />
        {[
          [40, 64, 48, 72],
          [96, 64, 64, 32],
          [96, 104, 30, 32],
          [130, 104, 30, 32],
        ].map(([x, y, w, h], i) => (
          <motion.rect
            key={i}
            x={x}
            width={w}
            height={h}
            rx="3"
            fill={accent}
            fillOpacity="0.28"
            initial={reducedMotion ? { y, opacity: 1 } : { y: y + 24, opacity: 0 }}
            animate={{ y, opacity: 1 }}
            transition={{ delay: 0.35 + i * 0.12, duration: 0.45 }}
          />
        ))}
      </svg>
    );
  }

  if (slug === "mobile-development") {
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <motion.rect
          x="70"
          y="28"
          width="60"
          height="144"
          rx="12"
          fill="none"
          stroke={accent}
          strokeWidth="2.2"
          {...draw}
          transition={{ duration: 0.8 }}
        />
        {[72, 100, 128].map((y, i) => (
          <motion.rect
            key={y}
            x="82"
            y={y}
            width="36"
            height="18"
            rx="2"
            fill={accent}
            fillOpacity="0.35"
            initial={reducedMotion ? { scale: 1 } : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 260, damping: 18 }}
          />
        ))}
      </svg>
    );
  }

  if (slug === "ai-solutions") {
    const nodes = [
      [40, 70],
      [40, 130],
      [100, 50],
      [100, 100],
      [100, 150],
      [160, 80],
      [160, 120],
    ];
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        {nodes.slice(0, -1).map((from, i) => (
          <motion.line
            key={i}
            x1={from[0]}
            y1={from[1]}
            x2={nodes[Math.min(i + 2, nodes.length - 1)][0]}
            y2={nodes[Math.min(i + 2, nodes.length - 1)][1]}
            stroke={accent}
            strokeWidth="1.2"
            {...draw}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="6"
            fill={accent}
            initial={reducedMotion ? { scale: 1 } : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.12 * i, type: "spring", stiffness: 280, damping: 16 }}
          />
        ))}
      </svg>
    );
  }

  if (slug === "data-analytics") {
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        {[40, 70, 100, 130, 160].map((x, i) => {
          const h = [40, 78, 52, 96, 64][i];
          return (
            <motion.rect
              key={x}
              x={x}
              width="18"
              fill={accent}
              fillOpacity="0.55"
              initial={reducedMotion ? { y: 150 - h, height: h } : { y: 150, height: 0 }}
              animate={{ y: 150 - h, height: h }}
              transition={{ duration: 0.65, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
        <motion.polyline
          points="49,110 79,72 109,98 139,54 169,86"
          fill="none"
          stroke="#ecfeff"
          strokeWidth="2"
          {...draw}
          transition={{ duration: 0.9, delay: 0.45 }}
        />
      </svg>
    );
  }

  if (slug === "cybersecurity") {
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <motion.path
          d="M100 30 L164 58 L164 118 L100 168 L36 118 L36 58 Z"
          fill={`${accent}22`}
          stroke={accent}
          strokeWidth="2"
          {...draw}
          transition={{ duration: 0.9 }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="18"
          fill="none"
          stroke="#ecfeff"
          strokeWidth="2"
          initial={reducedMotion ? { scale: 1 } : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.55, type: "spring" }}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      {[
        [40, 90],
        [100, 44],
        [160, 90],
        [70, 150],
        [130, 150],
      ].map(([x, y], i) => (
        <g key={i}>
          <motion.rect
            x={x - 12}
            y={y - 12}
            width="24"
            height="24"
            rx="3"
            fill={accent}
            fillOpacity="0.4"
            initial={reducedMotion ? { scale: 1 } : { scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.12 * i, type: "spring", stiffness: 240 }}
          />
          <motion.line
            x1="100"
            y1="100"
            x2={x}
            y2={y}
            stroke={accent}
            strokeWidth="1.2"
            {...draw}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
          />
        </g>
      ))}
    </svg>
  );
}

export function HeroBuildOverlay({
  service,
  reducedMotion,
  playKey,
}: HeroBuildOverlayProps) {
  const steps = BUILD_STEPS[service.slug];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        key={`grid-${playKey}`}
        initial={{ opacity: reducedMotion ? 0 : 0.55 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.4 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${service.accent}33 1px, transparent 1px),
            linear-gradient(90deg, ${service.accent}33 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }}
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: reducedMotion ? 0 : [1, 1, 0] }}
        transition={{ duration: 1.8, times: [0, 0.72, 1] }}
        className="absolute inset-0"
      >
        <Floors accent={service.accent} reducedMotion={reducedMotion} />
        <ServiceStructure
          slug={service.slug}
          accent={service.accent}
          reducedMotion={reducedMotion}
        />
      </motion.div>

      <motion.span
        key={`scan-${playKey}`}
        initial={{ top: "100%", opacity: 0 }}
        animate={{ top: ["100%", "-8%"], opacity: [0, 1, 0.8, 0] }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="absolute inset-x-0 h-10"
        style={{
          background: `linear-gradient(to top, transparent, ${service.accent}, transparent)`,
        }}
      />

      <AnimatePresence mode="wait">
        {steps.map((step, index) => (
          <motion.p
            key={`${playKey}-${step}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -6] }}
            transition={{
              duration: 0.85,
              delay: index * 0.55,
              times: [0, 0.18, 0.75, 1],
            }}
            className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-[#08090A]/70 px-3 py-1 text-[10px] tracking-[0.16em] text-cyan-100 uppercase"
          >
            {step}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
