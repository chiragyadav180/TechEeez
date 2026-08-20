"use client";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/animations/magnetic";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { sectionThemes } from "@/lib/themes";

const ContactParticles = dynamic(
  () =>
    import("@/components/three/contact-particles").then(
      (mod) => mod.ContactParticles,
    ),
  { ssr: false },
);

export function ContactCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-32"
      style={{ background: sectionThemes.contact.background }}
    >
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <ContactParticles />
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${sectionThemes.contact.glow}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8">
        <TextReveal
          as="h2"
          className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-white"
        >
          Let&apos;s build what&apos;s next.
        </TextReveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
            Need a technology partner? Talk to Tech Eeez about your next product,
            platform, or modernization initiative.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10">
            <Magnetic>
              <ButtonLink href="/contact">
                Start a Project
                <ArrowRight size={16} />
              </ButtonLink>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
