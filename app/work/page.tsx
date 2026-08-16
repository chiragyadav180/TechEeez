import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/page-shell";
import { clients } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected clients and partnerships by Tech Eeez.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell
      title="Selected clients"
      description="A focused snapshot of organizations that have worked with Tech Eeez."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {clients.map((client, index) => (
          <article
            key={client.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-xs tracking-[0.2em] text-white/45">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-2xl text-white">{client.name}</h2>
            <p className="mt-3 text-sm text-white/70">
              Client profile details can be expanded here as verified case study
              information becomes available.
            </p>
            <Link
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm text-cyan-300 hover:text-cyan-200"
            >
              Visit client website →
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
