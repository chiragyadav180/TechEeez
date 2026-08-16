import type { Metadata } from "next";
import { PageShell } from "@/components/sections/page-shell";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms and conditions for Tech Eeez website usage.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms & Conditions"
      description="This is a placeholder terms page and should be replaced with legally approved terms."
    >
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <p>
          By using this website, users agree to lawful usage and respectful
          communication.
        </p>
        <p>
          Service discussions and commitments are finalized through direct
          communication and formal agreements, not by website browsing alone.
        </p>
        <p>
          Please replace this placeholder text with finalized terms prior to
          launch.
        </p>
      </div>
    </PageShell>
  );
}
