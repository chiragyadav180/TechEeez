import type { Metadata } from "next";
import { HomeSections } from "@/components/sections/home-sections";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Premium software solutions for web, mobile, cloud, analytics, cybersecurity and integration.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1} ${siteConfig.address.line2}`,
      addressLocality: "Mumbai",
      postalCode: "400064",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <HomeSections />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  );
}
