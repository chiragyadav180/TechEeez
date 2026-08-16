import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/sections/page-shell";
import { getServiceBySlug, services } from "@/lib/services";

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <PageShell title={service.title} description={service.shortDescription}>
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl text-white">Capabilities</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {service.capabilities.map((capability) => (
              <li key={capability}>• {capability}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl text-white">Process (suggested workflow)</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {["Discover", "Define", "Design", "Build", "Scale"].map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl text-white">Approach</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {service.approach.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl text-white">Benefits</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {service.benefits.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl text-white">FAQs</h2>
        <div className="mt-4 space-y-4">
          {service.faq.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-white/10 p-4">
              <h3 className="text-base text-white">{faq.question}</h3>
              <p className="mt-2 text-sm text-white/70">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-cyan-300/30 bg-cyan-400/10 p-6">
        <h2 className="text-2xl text-white">Need this capability in action?</h2>
        <p className="mt-2 text-sm text-white/70">
          Talk to Tech Eeez about your current requirements and next phase roadmap.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-zinc-900"
        >
          Start a Project
        </Link>
      </section>
    </PageShell>
  );
}
