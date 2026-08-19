"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { AboutTechVisual } from "@/components/sections/about-tech-visual";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { siteConfig } from "@/lib/site";
import { sectionThemes } from "@/lib/themes";

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      whileHover={reduce ? undefined : { y: -4 }}
      className="border-t border-white/15 pt-5"
    >
      <p className="font-[family-name:var(--font-display)] text-3xl text-cyan-300 md:text-4xl">
        {isInView ? value : 0}
      </p>
      <p className="mt-2 text-sm text-white/65">{label}</p>
    </motion.div>
  );
}

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: sectionThemes.about.background }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 15% 40%, ${sectionThemes.about.glow}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-stretch gap-12 px-4 md:grid-cols-[1.15fr_0.85fr] md:px-8">
        <div className="flex flex-col">
          <TextReveal as="h2" className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.55rem,3.4vw,2.6rem)] leading-[1.14] tracking-[-0.02em] text-white">
            Technology should not just work. It should move your business forward.
          </TextReveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-[0.95rem]">
              Tech Eeez delivers AI, web, mobile, cloud, analytics, cybersecurity
              and system integration. The focus stays on business growth, practical
              outcomes and scalable execution.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {siteConfig.stats.map((item) => (
              <AnimatedCounter
                key={item.label}
                value={item.value}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="relative min-h-[280px] md:min-h-full">
          <AboutTechVisual reducedMotion={!!reduce} />
        </div>
      </div>
    </section>
  );
}
