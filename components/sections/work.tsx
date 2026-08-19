"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { clients } from "@/lib/clients";
import { sectionThemes } from "@/lib/themes";

export function WorkSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
      className="relative py-24 md:py-28"
      style={{ background: sectionThemes.work.background }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,3.2rem)] tracking-[-0.02em] text-white">
            Selected clients
          </h2>
          <p className="mt-4 max-w-xl text-white/65">
            Brands and teams we have partnered with across products and platforms.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {clients.map((client, index) => (
            <StaggerItem key={client.name}>
              <motion.a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -6,
                        borderColor: "rgba(103,232,249,0.35)",
                        backgroundColor: "rgba(255,255,255,0.06)",
                      }
                }
                className="group block border border-transparent border-b-white/10 bg-transparent p-5 transition"
              >
                <p className="text-xs text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-sm text-white transition group-hover:-translate-y-0.5">
                  {client.name}
                </p>
                <p className="mt-6 inline-flex items-center gap-1 text-xs text-cyan-300 opacity-0 transition group-hover:opacity-100">
                  Visit
                  <ArrowUpRight size={12} />
                </p>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
