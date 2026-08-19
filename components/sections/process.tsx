"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/animations/reveal";
import { processSteps } from "@/lib/process";
import { sectionThemes } from "@/lib/themes";

export function ProcessSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-28"
      style={{ background: sectionThemes.process.background }}
      aria-label="Suggested delivery process"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">
            Suggested workflow
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,3.2rem)] tracking-[-0.02em] text-white">
            From discovery to scale
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-0 top-3 hidden h-px w-full bg-white/10 md:block" />
          <motion.div
            style={{ scaleX: reduce ? 1 : lineScale, transformOrigin: "left" }}
            className="absolute left-0 top-3 hidden h-px w-full bg-cyan-300/50 md:block"
          />
          <div className="grid gap-8 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.06}>
                <div>
                  <p className="text-xs tracking-[0.2em] text-cyan-300">
                    {step.number}
                  </p>
                  <h3 className="mt-4 text-lg text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
