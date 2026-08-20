"use client";

import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { services } from "@/lib/services";
import { sectionThemes } from "@/lib/themes";

const ServicesSceneCanvas = dynamic(
  () =>
    import("@/components/three/services-scene-canvas").then(
      (mod) => mod.ServicesSceneCanvas,
    ),
  { ssr: false },
);

const ServicesBackdropCanvas = dynamic(
  () =>
    import("@/components/three/services-scene-canvas").then(
      (mod) => mod.ServicesBackdropCanvas,
    ),
  { ssr: false },
);

export function ServicesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const lockAt = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const [activeService, setActiveService] = useState(0);
  const [burstKey, setBurstKey] = useState(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (lockAt.current !== null && Math.abs(value - lockAt.current) < 0.12) {
      return;
    }
    lockAt.current = null;
    const next = Math.min(
      services.length - 1,
      Math.floor(value * services.length),
    );
    setActiveService((prev) => (prev === next ? prev : next));
  });

  const activate = (index: number, lock = false) => {
    if (lock) lockAt.current = scrollYProgress.get();
    if (index !== activeService || lock) {
      setBurstKey((value) => value + 1);
    }
    setActiveService(index);
  };

  const active = services[activeService];

  return (
    <section
      id="services"
      ref={ref}
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: sectionThemes.services.background }}
    >
      <ServicesBackdropCanvas accent={active.accent} reducedMotion={!!reduce} />
      <div className="services-field-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#101115_76%)]" />
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle at 78% 28%, ${active.accent}28, transparent 42%)`,
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.55rem,3.4vw,2.55rem)] leading-[1.14] tracking-[-0.02em] text-white">
              Capabilities built for modern businesses.
            </h2>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200"
            >
              View all services
              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-1">
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <button
                  type="button"
                  key={service.slug}
                  onClick={() => activate(index, true)}
                  onMouseEnter={() => activate(index)}
                  onFocus={() => activate(index)}
                  className={`group relative w-full border-b border-white/10 px-1 py-4 text-left transition ${
                    isActive ? "text-white" : "text-white/55 hover:text-white/85"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-glow"
                      className="absolute inset-0 -z-10 bg-cyan-400/5"
                      transition={{ type: "spring", stiffness: 280, damping: 30 }}
                    />
                  )}
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p
                        className={`text-[11px] tracking-[0.22em] transition ${
                          isActive ? "text-cyan-300" : "text-white/35"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p
                        className={`mt-1.5 text-lg transition md:text-xl ${
                          isActive ? "translate-x-1" : "group-hover:translate-x-1"
                        }`}
                      >
                        {service.title}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className={`shrink-0 transition ${
                        isActive
                          ? "translate-x-0 opacity-100 text-cyan-300"
                          : "translate-x-[-4px] opacity-0"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28 lg:h-[min(74vh,620px)]">
            <article className="flex h-full flex-col overflow-hidden border border-white/10 bg-[#12141a]/55 backdrop-blur-sm">
              <div className="relative min-h-[240px] flex-1">
                <ServicesSceneCanvas
                  service={active}
                  reducedMotion={!!reduce}
                  burstKey={burstKey}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="border-t border-white/10 p-5 md:p-6"
                >
                  <p className="text-[11px] tracking-[0.22em] text-cyan-300">
                    {String(activeService + 1).padStart(2, "0")} / {active.shortLabel}
                  </p>
                  <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-xl text-white md:text-2xl">
                    {active.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    {active.pitch}
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-white/55">
                    {active.capabilities.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${active.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200"
                  >
                    Explore service
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
