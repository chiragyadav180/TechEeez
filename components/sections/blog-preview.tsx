"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { blogPosts, estimateReadingTime } from "@/lib/blog";
import { sectionThemes } from "@/lib/themes";

export function BlogPreviewSection() {
  const reduce = useReducedMotion();
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section
      id="blog"
      className="relative py-24 md:py-28"
      style={{ background: sectionThemes.blog.background }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,3.2rem)] tracking-[-0.02em] text-white">
              From the blog
            </h2>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-cyan-300"
            >
              View all articles
              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/30 hover:bg-[linear-gradient(180deg,rgba(34,211,238,0.08),transparent)]"
            >
              <p className="text-xs text-cyan-300">{post.category}</p>
              <h3 className="mt-3 text-xl text-white transition group-hover:-translate-y-0.5">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{post.excerpt}</p>
              <p className="mt-5 text-xs text-white/45">
                {estimateReadingTime(post)} min read
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300"
              >
                Read article
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
