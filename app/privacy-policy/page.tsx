import type { Metadata } from "next";
import { PageShell } from "@/components/sections/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Tech Eeez website visitors.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="This page provides a baseline policy template and should be reviewed with legal counsel before production use."
    >
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <p>
          Tech Eeez may collect contact details submitted through forms for
          communication and service inquiry purposes.
        </p>
        <p>
          Submitted data should only be used for legitimate business
          communication, service consultation, and follow-up.
        </p>
        <p>
          Please replace this placeholder policy with your approved legal policy
          before deployment.
        </p>
      </div>
    </PageShell>
  );
}
