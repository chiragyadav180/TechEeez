import type { Metadata } from "next";
import { PageShell } from "@/components/sections/page-shell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Tech Eeez delivers innovation-focused software solutions for business growth.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell
      title="Engineering built around business goals."
      description="Tech Eeez is a software solutions company focused on innovation and business growth. We combine modern engineering with practical delivery across web, mobile, cloud, data, security, and integration."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {siteConfig.stats.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-4xl font-semibold text-cyan-300">{item.value}</p>
            <p className="mt-1 text-sm text-white/70">{item.label}</p>
          </article>
        ))}
      </section>
      <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl text-white md:text-3xl">Why Tech Eeez</h2>
        <ul className="mt-6 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
          <li>Innovation-led thinking for modern business needs</li>
          <li>Scalable solution planning from the start</li>
          <li>User-centric product and platform experiences</li>
          <li>Performance-focused implementation choices</li>
          <li>Security and integration-aware architecture</li>
          <li>Execution that stays aligned with business growth</li>
        </ul>
      </section>
    </PageShell>
  );
}
