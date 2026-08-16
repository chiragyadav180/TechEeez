"use client";

import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Cloud, Database, Globe, Lock, Smartphone, Workflow } from "lucide-react";
import { chapters, siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { clients, featuredTestimonial } from "@/lib/clients";
import { blogPosts, estimateReadingTime } from "@/lib/blog";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/animations/reveal";

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, borderColor: "rgba(103,232,249,0.5)" }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
    >
      <p className="text-4xl font-semibold text-cyan-300">{isInView ? value : 0}</p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </motion.div>
  );
}

export function HomeSections() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const [activeService, setActiveService] = useState(0);

  const serviceIcons = [Globe, Smartphone, Cloud, Database, Lock, Workflow] as const;
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start center", "end center"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 120],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.28]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -70]);
  const latestPosts = useMemo(() => blogPosts.slice(0, 3), []);
  const activeData = services[activeService];
  const ActiveIcon = serviceIcons[activeService];

  useMotionValueEvent(servicesProgress, "change", (value) => {
    const next = Math.min(services.length - 1, Math.floor(value * services.length));
    setActiveService((prev) => (prev === next ? prev : next));
  });

  return (
    <>
      <section id="home" ref={heroRef} className="relative overflow-hidden bg-[#0b0b0c] pt-36 pb-28">
        <motion.div style={{ y }} className="absolute inset-0 -z-10 opacity-90">
          <div className="absolute -top-32 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/18 blur-3xl" />
          <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-violet-500/14 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.08),transparent_35%)]" />
        </motion.div>
        <motion.div style={{ opacity }} className="mx-auto w-full max-w-6xl px-4 md:px-8">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-cyan-200">
            Software solutions company in Mumbai
          </p>
          <motion.h1
            style={{ y: titleY }}
            className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-7xl"
          >
            Technology that turns ambitious ideas into real business growth.
          </motion.h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            Tech Eeez builds modern digital products, scalable systems, and
            intelligent technology solutions that help businesses move faster.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Start a Project</ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              Explore Our Services
            </ButtonLink>
          </div>
        </motion.div>
      </section>

      <section id="about" className="bg-[#101012]">
        <div className="mx-auto w-full max-w-6xl px-4 py-18 md:px-8">
          <Reveal>
            <h2 className="max-w-4xl text-3xl leading-tight text-white md:text-5xl">
              Technology should not just work. It should move your business forward.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-white/70">
              Tech Eeez delivers innovation-focused software solutions across web,
              mobile, cloud, data analytics, cybersecurity and system integration.
              The focus stays on business growth, practical outcomes and scalable
              execution.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#111214]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-3 md:px-8">
        {siteConfig.stats.map((item) => (
          <Counter key={item.label} value={item.value} label={item.label} />
        ))}
        </div>
      </section>

      <section
        id="services"
        ref={servicesRef}
        className="relative min-h-[92vh] bg-[#121318] py-18"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(34,211,238,0.16),transparent_42%)]" />
        <div className="mx-auto relative z-10 w-full max-w-6xl px-4 md:px-8">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="text-3xl text-white md:text-5xl">
                Capabilities built for modern businesses.
              </h2>
              <Link href="/services" className="text-sm text-cyan-300 hover:text-cyan-200">
                View all services
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-2 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2">
              {services.map((service, index) => (
                <button
                  type="button"
                  key={service.slug}
                  onMouseEnter={() => setActiveService(index)}
                  className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                    activeService === index
                      ? "border-cyan-300/50 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/8"
                  }`}
                >
                  <p className="text-xs tracking-[0.2em]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-lg">{service.title}</p>
                </button>
              ))}
            </div>

            <motion.article
              key={activeData.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-[#17181d] p-7 backdrop-blur-sm lg:sticky lg:top-28"
            >
              <div className="mb-5 inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 p-3 text-cyan-200">
                <ActiveIcon size={20} />
              </div>
              <p className="text-xs tracking-[0.2em] text-cyan-300">
                {String(activeService + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-3xl text-white">{activeData.title}</h3>
              <p className="mt-3 text-white/70">{activeData.shortDescription}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {activeData.capabilities.map((capability) => (
                  <li key={capability}>• {capability}</li>
                ))}
              </ul>
              <Link
                href={`/services/${activeData.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300"
              >
                Explore service
                <ArrowRight size={14} />
              </Link>
            </motion.article>
          </div>
        </div>
      </section>

      <section id="work" className="bg-[#0f1014]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <Reveal>
          <h2 className="text-3xl text-white md:text-5xl">Selected clients</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {clients.map((client, index) => (
            <motion.a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur-sm"
            >
              <p className="text-xs text-white/45">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-sm">{client.name}</p>
              <p className="mt-3 text-xs text-cyan-300 opacity-0 transition group-hover:opacity-100">
                View client →
              </p>
            </motion.a>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-[#111117]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <motion.blockquote
          whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-10"
        >
          <p className="text-2xl leading-tight text-white md:text-4xl">
            &ldquo;{featuredTestimonial.quote}&rdquo;
          </p>
          <footer className="mt-6 text-sm text-white/70">
            {featuredTestimonial.person} — {featuredTestimonial.role}
          </footer>
        </motion.blockquote>
        </div>
      </section>

      <section className="bg-[#121218]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <h2 className="text-3xl text-white md:text-5xl">Scroll chapters</h2>
        <div className="mt-8 space-y-4">
          {chapters.map((chapter, index) => (
            <Reveal key={chapter} delay={index * 0.03}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs tracking-[0.2em] text-white/45">
                CHAPTER {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-xl text-white">{chapter}</p>
            </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section id="blog" className="bg-[#101015]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <h2 className="text-3xl text-white md:text-5xl">From the blog</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latestPosts.map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.45 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-xs text-cyan-300">{post.category}</p>
              <h3 className="mt-2 text-xl text-white transition group-hover:-translate-y-0.5">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">{post.excerpt}</p>
              <p className="mt-4 text-xs text-white/50">
                {estimateReadingTime(post)} min read
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300"
              >
                Read article{" "}
                <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </Link>
            </motion.article>
          ))}
        </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0b0b0d]">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
          <Reveal>
            <h2 className="max-w-3xl text-4xl font-semibold text-white md:text-6xl">
              Let&apos;s build what&apos;s next.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-white/70">
              Need a technology partner? Talk to Tech Eeez about your next
              product, platform, or modernization initiative.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <ButtonLink href="/contact">Start a Project</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
