import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Tech Eeez about AI, web, mobile, cloud, analytics, cybersecurity, or integration projects.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 md:px-8 md:pt-32">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-white md:text-6xl">
          Let&apos;s build what&apos;s next.
        </h1>
        <p className="mt-5 text-white/70">
          Have a project in mind? Need a technology partner? Talk to Tech Eeez.
        </p>
      </header>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <ContactForm />
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl text-white">Contact details</h2>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            <p>{siteConfig.name}</p>
            <p>{siteConfig.address.line1}</p>
            <p>{siteConfig.address.line2}</p>
            <p>{siteConfig.address.city}</p>
            <p>{siteConfig.phone}</p>
            <a href={`mailto:${siteConfig.email}`} className="text-cyan-300">
              {siteConfig.email}
            </a>
          </div>
          <p className="mt-6 text-xs text-white/60">
            Backend note: this form is connected to <code>/api/contact</code>.
            Configure your actual email/CRM provider in that route before
            production launch.
          </p>
        </aside>
      </div>
    </div>
  );
}
