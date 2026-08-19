"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/animations/magnetic";
import { HeroServiceStage } from "@/components/sections/hero-service-stage";
import { ButtonLink } from "@/components/ui/button-link";
import { services, type Service } from "@/lib/services";
import { sectionThemes } from "@/lib/themes";

const HeroSceneCanvas = dynamic(
  () =>
    import("@/components/three/hero-scene-canvas").then(
      (mod) => mod.HeroSceneCanvas,
    ),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#08090A]" /> },
);

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlug, setActiveSlug] = useState<Service["slug"]>(
    services[0].slug,
  );
  const [burstKey, setBurstKey] = useState(1);
  const [tapKey, setTapKey] = useState(1);
  const [paused, setPaused] = useState(false);
  const [cycleReset, setCycleReset] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setScrollProgress(value);
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -32],
  );

  const active = services.find((service) => service.slug === activeSlug) ?? services[0];
  const accent = active.accent;

  const playService = (slug: Service["slug"]) => {
    if (slug === activeSlug) {
      setTapKey((value) => value + 1);
    } else {
      setActiveSlug(slug);
      setBurstKey((value) => value + 1);
      setTapKey(1);
    }
    setCycleReset((value) => value + 1);
  };

  useEffect(() => {
    if (paused) return;

    const id = window.setInterval(() => {
      setActiveSlug((current) => {
        const index = services.findIndex((service) => service.slug === current);
        return services[(index + 1) % services.length].slug;
      });
      setBurstKey((value) => value + 1);
      setTapKey(1);
    }, 5000);

    return () => window.clearInterval(id);
  }, [paused, activeSlug, cycleReset]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex h-[100svh] flex-col overflow-hidden pt-16"
      style={{ background: sectionThemes.hero.background }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 78% 46%, ${accent}26, transparent 32%)`,
        }}
      />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-rows-[auto_minmax(220px,1fr)] gap-3 px-4 py-3 md:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(300px,1.1fr)] lg:grid-rows-1 lg:gap-8 lg:py-5"
      >
        <div className="flex min-w-0 flex-col justify-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-3 text-[11px] uppercase tracking-[0.28em] text-cyan-200/90"
          >
            Software solutions company in Mumbai
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.6vw,2.15rem)] font-semibold leading-[1.18] tracking-[-0.03em] text-white"
          >
            Technology that turns ambitious ideas into real business growth.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 max-w-md text-sm leading-6 text-white/68"
          >
            AI, web, mobile, cloud, analytics, security, and integration —
            built to help businesses move faster.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="mt-5"
          >
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
              Capabilities play live — click to jump ahead
            </p>
            <div
              className="flex flex-wrap gap-2"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {services.map((service) => {
                const isActive = activeSlug === service.slug;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => playService(service.slug)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      isActive
                        ? "border-cyan-300/80 bg-cyan-300/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/35 hover:text-white"
                    }`}
                    style={
                      isActive
                        ? { boxShadow: `0 0 18px ${service.accent}33` }
                        : undefined
                    }
                  >
                    {service.shortLabel}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.36 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            <Magnetic>
              <ButtonLink href="/contact" className="px-5 py-2.5 text-sm">
                Start a Project
                <ArrowRight size={15} />
              </ButtonLink>
            </Magnetic>
            <ButtonLink
              href={`/services/${active.slug}`}
              variant="ghost"
              className="px-5 py-2.5 text-sm"
            >
              Explore {active.shortLabel}
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-0 items-stretch lg:h-full"
        >
          <HeroServiceStage
            service={active}
            burstKey={burstKey}
            tapKey={tapKey}
            reducedMotion={!!reduce}
            onInteract={() => setTapKey((value) => value + 1)}
            onHoverChange={setPaused}
          >
            <HeroSceneCanvas
              scrollProgress={scrollProgress}
              reducedMotion={!!reduce}
              accent={accent}
              serviceSlug={active.slug}
              burstKey={burstKey}
            />
            <div className="hero-floor-grid absolute inset-0" />
          </HeroServiceStage>
        </motion.div>
      </motion.div>
    </section>
  );
}
