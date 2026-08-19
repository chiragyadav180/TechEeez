"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bell,
  Cloud,
  Cpu,
  Database,
  Lock,
  Mail,
  Map,
  MessageCircle,
  Server,
  Shield,
  ShoppingBag,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Service } from "@/lib/services";

type LiveDemoProps = {
  service: Service;
  reducedMotion: boolean;
  tapKey: number;
};

function useCycle(length: number, ms: number, paused: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused || length < 2) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, paused]);
  return index;
}

function HudChip({
  label,
  value,
  accent,
  className = "",
}: {
  label: string;
  value: string;
  accent: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/15 bg-[#08090A]/70 px-3 py-2 backdrop-blur-md ${className}`}
      style={{ boxShadow: `0 0 24px ${accent}22` }}
    >
      <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-0.5 text-sm text-white">{value}</p>
    </div>
  );
}

function LivePhone({
  reducedMotion,
  tapKey,
  hud,
}: {
  reducedMotion: boolean;
  tapKey: number;
  hud: boolean;
}) {
  const screen = useCycle(3, 3800, reducedMotion);

  const apps = [
    { icon: MessageCircle, label: "Chat", color: "#67e8f9" },
    { icon: Map, label: "Maps", color: "#86efac" },
    { icon: ShoppingBag, label: "Shop", color: "#fde68a" },
    { icon: Bell, label: "Alerts", color: "#fda4af" },
    { icon: Cloud, label: "Drive", color: "#7dd3fc" },
    { icon: Activity, label: "Fit", color: "#c4b5fd" },
  ];

  if (hud) {
    return (
      <div className="relative h-full p-4">
        <AnimatePresence>
          {tapKey > 0 ? (
            <motion.div
              key={tapKey}
              initial={{ y: -28, opacity: 0 }}
              animate={{ y: [ -28, 0, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, times: [0, 0.12, 0.72, 1] }}
              className="absolute left-4 right-4 top-4 rounded-2xl border border-white/15 bg-[#08090A]/80 p-3 backdrop-blur-md"
            >
              <p className="text-[10px] text-cyan-200">Push notification</p>
              <p className="text-xs text-white">Your app just went live — 2,481 users online.</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div className="absolute bottom-24 left-4 right-4 grid grid-cols-3 gap-2">
          <HudChip label="Platforms" value="iOS + Android" accent="#5eead4" />
          <HudChip label="Release" value="Stable build" accent="#5eead4" />
          <HudChip label="Retention" value="+24%" accent="#5eead4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center px-4 pb-24 pt-6">
      <motion.div
        initial={reducedMotion ? false : { y: 28, opacity: 0, rotate: -6 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.15 }}
        className="relative h-[min(100%,420px)] w-[min(100%,210px)] rounded-[36px] border border-white/20 bg-[#05070a] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-full overflow-hidden rounded-[28px] bg-[#0b1220]">
          <div className="flex items-center justify-between px-4 pb-1 pt-7 text-[10px] text-white/80">
            <span>9:41</span>
            <span className="inline-flex items-center gap-1">
              <Wifi size={10} />
              <span className="h-2 w-4 rounded-sm bg-white/100" />
            </span>
          </div>

          <AnimatePresence>
            {tapKey > 0 ? (
              <motion.div
                key={tapKey}
                initial={{ y: -40, opacity: 0, scale: 0.96 }}
                animate={{ y: [-40, 0, 0], opacity: [0, 1, 1, 0], scale: 1 }}
                transition={{ duration: 2.4, times: [0, 0.12, 0.72, 1] }}
                className="absolute left-3 right-3 top-12 z-30 rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur-md"
              >
                <p className="text-[10px] text-cyan-200">Order update</p>
                <p className="text-[11px] text-white">Your app just went live.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {screen === 0 && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                className="grid grid-cols-3 gap-3 px-4 pt-6"
              >
                {apps.map((app, index) => (
                  <motion.div
                    key={app.label}
                    initial={reducedMotion ? false : { scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.08 * index, type: "spring", stiffness: 260 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{ background: `${app.color}22`, color: app.color }}
                    >
                      <app.icon size={16} />
                    </span>
                    <span className="text-[9px] text-white/70">{app.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {screen === 1 && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                className="space-y-2 px-3 pt-4"
              >
                {["New booking confirmed", "Driver is 4 min away", "Share live location?"].map(
                  (message, index) => (
                    <motion.div
                      key={message}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.15 * index }}
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] ${
                        index === 2
                          ? "ml-auto bg-cyan-300 text-zinc-950"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {message}
                    </motion.div>
                  ),
                )}
              </motion.div>
            )}
            {screen === 2 && (
              <motion.div
                key="dash"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                className="px-3 pt-4"
              >
                <p className="text-[11px] text-white/50">Today</p>
                <p className="mt-1 text-2xl font-semibold text-white">2,481</p>
                <p className="text-[11px] text-cyan-300">active users</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </div>
  );
}

function LiveWeb({ reducedMotion, hud }: { reducedMotion: boolean; hud: boolean }) {
  if (hud) {
    return (
      <div className="relative h-full p-4">
        <div className="absolute left-4 right-4 top-4 overflow-hidden rounded-xl border border-white/15 bg-[#08090A]/75 backdrop-blur-md">
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ml-2 flex-1 rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/50">
              techeeez.com
            </span>
          </div>
          <motion.div
            className="h-0.5 bg-cyan-300"
            animate={{ width: ["0%", "100%", "100%", "0%"] }}
            transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.3, 0.85, 1] }}
          />
        </div>
        <div className="absolute bottom-24 left-4 right-4 grid grid-cols-3 gap-2">
          <HudChip label="LCP" value="1.1s" accent="#67e8f9" />
          <HudChip label="Devices" value="Responsive" accent="#67e8f9" />
          <HudChip label="Stack" value="Modern web" accent="#67e8f9" />
        </div>
        <motion.span
          animate={{ x: [48, 210, 140, 48], y: [88, 140, 190, 88] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute h-3 w-3 rotate-45 rounded-sm bg-white"
        />
      </div>
    );
  }

  return (
    <div className="flex h-full items-center px-5 pb-24 pt-6">
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-white/15 bg-[#0b1220] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 flex-1 rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/45">
            techeeez.com
          </span>
        </div>
        <motion.div
          className="h-0.5 bg-cyan-300"
          animate={reducedMotion ? { width: "100%" } : { width: ["0%", "100%", "100%", "0%"] }}
          transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.3, 0.85, 1] }}
        />
        <div className="grid grid-cols-[72px_1fr] gap-3 p-3">
          <div className="space-y-2">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="h-6 rounded bg-white/10" />
            ))}
          </div>
          <div className="space-y-2 overflow-hidden">
            <div className="h-16 rounded-lg bg-cyan-300/15" />
            <div className="h-10 rounded-lg bg-white/10" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 rounded-lg bg-white/10" />
              <div className="h-14 rounded-lg bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveAi({ reducedMotion, hud }: { reducedMotion: boolean; hud: boolean }) {
  const messages = [
    { role: "user", text: "Summarize this week's sales." },
    { role: "ai", text: "Revenue is up 18%. Top region: West." },
    { role: "user", text: "Draft a follow-up for the team." },
    { role: "ai", text: "Done — a concise update is ready to send." },
  ];
  const visible = useCycle(messages.length, 1600, reducedMotion);

  return (
    <div className={`flex h-full ${hud ? "items-end p-4 pb-24" : "items-center px-5 pb-24 pt-6"}`}>
      <div className={`w-full ${hud ? "max-w-sm rounded-2xl border border-white/15 bg-[#08090A]/75 p-3 backdrop-blur-md" : "mx-auto max-w-sm space-y-3"}`}>
        <div className="flex items-center gap-2 text-xs text-violet-200">
          <Cpu size={14} />
          AI copilot live
        </div>
        <div className="mt-2 space-y-2">
          {messages.slice(0, visible + 1).map((message) => (
            <motion.div
              key={message.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs ${
                message.role === "ai"
                  ? "bg-violet-400/20 text-violet-100"
                  : "ml-auto bg-white/10 text-white"
              }`}
            >
              {message.text}
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="inline-block h-4 w-1.5 bg-cyan-300"
          />
        </div>
      </div>
    </div>
  );
}

function LiveCloud({ reducedMotion, hud }: { reducedMotion: boolean; hud: boolean }) {
  if (hud) {
    return (
      <div className="relative h-full p-4">
        <div className="absolute right-4 top-4 space-y-2">
          <HudChip label="Region" value="AWS / Azure" accent="#7dd3fc" />
          <HudChip label="Autoscaling" value="Healthy" accent="#7dd3fc" />
          <HudChip label="Uptime" value="99.95%" accent="#7dd3fc" />
        </div>
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            animate={{ y: [90, -40], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.45 }}
            className="absolute bottom-28 h-2 w-2 rounded-full bg-cyan-200"
            style={{ left: `calc(50% + ${(index - 1) * 28}px)` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6 pb-24 pt-8">
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3.2, repeat: Infinity }}
        className="mb-6 text-cyan-200"
      >
        <Cloud size={54} />
      </motion.div>
      <div className="flex items-end gap-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="relative h-24 w-16 overflow-hidden rounded-md border border-white/15 bg-[#0b1220]"
          >
            {Array.from({ length: 8 }).map((_, row) => (
              <motion.span
                key={row}
                animate={reducedMotion ? undefined : { opacity: [0.2, 1, 0.25] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.15 + row * 0.08,
                }}
                className="mx-auto mt-1.5 block h-1.5 w-10 rounded-full bg-cyan-300/80"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveAnalytics({ reducedMotion, hud }: { reducedMotion: boolean; hud: boolean }) {
  const [value, setValue] = useState(1284);
  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setValue((current) => current + Math.floor(Math.random() * 9) + 1);
    }, 700);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className={`flex h-full ${hud ? "items-start justify-end p-4" : "items-end px-6 pb-28 pt-8"}`}>
      <div className={hud ? "w-44 rounded-2xl border border-white/15 bg-[#08090A]/75 p-3 backdrop-blur-md" : "w-full"}>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Live revenue</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-3xl text-white">
          {value.toLocaleString()}
        </p>
        <div className={`mt-4 flex items-end gap-1 ${hud ? "h-16" : "mt-5 h-28 gap-2"}`}>
          {[36, 58, 44, 72, 63, 88, 51, 79].map((h, i) => (
            <motion.span
              key={i}
              animate={
                reducedMotion
                  ? { height: `${h}%` }
                  : { height: [`${h - 18}%`, `${h}%`, `${h - 10}%`] }
              }
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.12 }}
              className="flex-1 rounded-sm bg-gradient-to-t from-emerald-400/30 to-emerald-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveSecurity({ reducedMotion, hud }: { reducedMotion: boolean; hud: boolean }) {
  const [blocked, setBlocked] = useState(14);
  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setBlocked((value) => value + 1), 1400);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="relative h-full">
      {!hud ? (
        <div className="flex h-full items-center justify-center pb-24">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
            <Shield className="text-cyan-200" />
            <Lock size={14} className="absolute text-white" />
          </div>
        </div>
      ) : null}
      {[0, 1, 2, 3].map((index) => (
        <motion.span
          key={index}
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [120, 0],
                  y: [index * 18 - 30, 0],
                  opacity: [0, 1, 0],
                  scale: [1, 0.4],
                }
          }
          transition={{ duration: 1.7, repeat: Infinity, delay: index * 0.35 }}
          className="absolute left-1/2 top-[42%] h-2 w-2 rounded-sm bg-rose-400"
        />
      ))}
      <div className="absolute bottom-24 left-4">
        <HudChip
          label="Threats blocked"
          value={`${blocked} live`}
          accent="#5eead4"
        />
      </div>
    </div>
  );
}

function LiveIntegration({ reducedMotion, hud }: { reducedMotion: boolean; hud: boolean }) {
  const systems = [
    { label: "CRM", icon: Mail },
    { label: "ERP", icon: Database },
    { label: "API", icon: Server },
  ];

  return (
    <div className={`relative flex h-full items-center justify-center gap-8 px-6 ${hud ? "pb-20" : "pb-24"}`}>
      {systems.map((system) => (
        <div
          key={system.label}
          className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl border border-white/15 bg-[#08090A]/70 text-[10px] text-white backdrop-blur-md"
        >
          <system.icon size={14} className="text-cyan-200" />
          {system.label}
        </div>
      ))}
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          animate={reducedMotion ? undefined : { x: [-90, 90], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.4 }}
          className="absolute h-2.5 w-2.5 rounded-full bg-cyan-300"
        />
      ))}
    </div>
  );
}

export function HeroLiveDemo({ service, reducedMotion, tapKey }: LiveDemoProps) {
  const hud = !reducedMotion;

  switch (service.slug) {
    case "mobile-development":
      return <LivePhone reducedMotion={reducedMotion} tapKey={tapKey} hud={hud} />;
    case "web-development":
      return <LiveWeb reducedMotion={reducedMotion} hud={hud} />;
    case "ai-solutions":
      return <LiveAi reducedMotion={reducedMotion} hud={hud} />;
    case "cloud-solutions":
      return <LiveCloud reducedMotion={reducedMotion} hud={hud} />;
    case "data-analytics":
      return <LiveAnalytics reducedMotion={reducedMotion} hud={hud} />;
    case "cybersecurity":
      return <LiveSecurity reducedMotion={reducedMotion} hud={hud} />;
    default:
      return <LiveIntegration reducedMotion={reducedMotion} hud={hud} />;
  }
}
