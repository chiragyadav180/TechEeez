import Link from "next/link";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <h2 className="text-lg font-semibold text-white">{siteConfig.name}</h2>
          <p className="mt-3 text-sm text-white/70">{siteConfig.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Navigation</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cyan-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:text-cyan-300"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <p>{siteConfig.address.line1}</p>
            <p>{siteConfig.address.line2}</p>
            <p>{siteConfig.address.city}</p>
            <p>{siteConfig.phone}</p>
            <a className="hover:text-cyan-300" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/50">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="mt-1 flex items-center justify-center gap-4">
          <Link href="/privacy-policy" className="hover:text-cyan-300">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-cyan-300">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
