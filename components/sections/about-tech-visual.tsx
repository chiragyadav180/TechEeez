"use client";

import { Cloud, Cpu, Globe, Shield } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const modules = [
  { id: "ai", label: "AI", icon: Cpu, className: "col-start-1 row-start-1" },
  { id: "web", label: "Web", icon: Globe, className: "col-start-3 row-start-1" },
  { id: "cloud", label: "Cloud", icon: Cloud, className: "col-start-1 row-start-3" },
  { id: "secure", label: "Secure", icon: Shield, className: "col-start-3 row-start-3" },
] as const;

export function AboutTechVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const reduceHook = useReducedMotion();
  const reduce = reducedMotion || !!reduceHook;

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#101217] md:min-h-[360px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.16),transparent_58%)]" />

      {!reduce ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
          animate={{ top: ["8%", "92%", "8%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300">
            System architecture
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/45">
            <span className="relative flex h-1.5 w-1.5">
              {!reduce ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
              ) : null}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
            </span>
            Live
          </span>
        </div>

        <div className="relative mx-auto grid aspect-square w-full max-w-[320px] flex-1 grid-cols-3 grid-rows-3 place-items-center">
          <svg
            className="pointer-events-none absolute inset-[16%] h-[68%] w-[68%]"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden
          >
            <path d="M8 8 H92 V92 H8 Z" stroke="rgba(103,232,249,0.18)" strokeWidth="1" />
            <path d="M50 8 V92 M8 50 H92" stroke="rgba(103,232,249,0.28)" strokeWidth="1.2" />
            <motion.path
              d="M8 8 H92 V92 H8 Z"
              stroke="#67e8f9"
              strokeWidth="1.4"
              strokeDasharray="12 28"
              animate={reduce ? undefined : { strokeDashoffset: [0, -80] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              r="3"
              fill="#ecfeff"
              animate={
                reduce
                  ? { cx: 50, cy: 50 }
                  : { cx: [8, 92, 92, 8, 8], cy: [8, 8, 92, 92, 8] }
              }
              transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {modules.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${item.className} flex h-[72px] w-[72px] flex-col items-center justify-center rounded-xl border border-cyan-300/25 bg-[#0b0d12]/90 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.08)] md:h-20 md:w-20`}
              initial={reduce ? false : { opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12 * index, duration: 0.45 }}
            >
              <motion.span
                animate={
                  reduce
                    ? undefined
                    : { opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: index * 0.35,
                }}
                className="flex flex-col items-center"
              >
                <item.icon size={18} />
                <span className="mt-1 text-[10px] tracking-[0.16em] text-white/80">
                  {item.label}
                </span>
              </motion.span>
            </motion.div>
          ))}

          <motion.div
            className="col-start-2 row-start-2 flex h-[84px] w-[84px] flex-col items-center justify-center rounded-2xl border border-cyan-200/40 bg-cyan-300/10 text-center md:h-24 md:w-24"
            animate={
              reduce
                ? undefined
                : {
                    boxShadow: [
                      "0 0 0 rgba(34,211,238,0.12)",
                      "0 0 28px rgba(34,211,238,0.35)",
                      "0 0 0 rgba(34,211,238,0.12)",
                    ],
                  }
            }
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            <Cpu size={22} className="text-cyan-200" />
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white">
              Core
            </p>
          </motion.div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {["Build", "Train", "Ship", "Scale"].map((step, index) => (
            <motion.p
              key={step}
              className="rounded-md border border-white/10 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/55"
              animate={
                reduce
                  ? undefined
                  : { borderColor: ["rgba(255,255,255,0.1)", "rgba(103,232,249,0.55)", "rgba(255,255,255,0.1)"] }
              }
              transition={{ duration: 3.6, repeat: Infinity, delay: index * 0.45 }}
            >
              {step}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
