import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/sections/page-shell";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Tech Eeez services in web, mobile, cloud, analytics, cybersecurity, and system integration.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageShell
      title="Six capabilities. One technology partner."
      description="Our services are designed to help businesses build faster, scale confidently, and operate with clarity."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <article
            key={service.slug}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-xs tracking-[0.2em] text-white/45">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-2xl text-white">{service.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              {service.shortDescription}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-white/70">
              {service.capabilities.map((capability) => (
                <li key={capability}>• {capability}</li>
              ))}
            </ul>
            <Link
              href={`/services/${service.slug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300"
            >
              Explore service <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
