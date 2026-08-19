"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";
import { featuredTestimonial } from "@/lib/clients";
import { sectionThemes } from "@/lib/themes";

export function TestimonialSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative py-20 md:py-24"
      style={{ background: sectionThemes.work.background }}
      aria-label="Client testimonial"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <motion.blockquote
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="border-l border-cyan-300/40 pl-6 md:pl-10"
          >
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 block font-[family-name:var(--font-display)] text-5xl text-cyan-300/50"
              aria-hidden
            >
              “
            </motion.span>
            <p className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(1.4rem,3.2vw,2.4rem)] leading-[1.25] tracking-[-0.02em] text-white">
              {featuredTestimonial.quote}
            </p>
            <footer className="mt-8 text-sm text-white/65">
              <cite className="not-italic text-white">
                {featuredTestimonial.person}
              </cite>
              <span className="mx-2 text-white/30">—</span>
              {featuredTestimonial.role}
            </footer>
          </motion.blockquote>
        </Reveal>
      </div>
    </section>
  );
}
