"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/animations/magnetic";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#08090A]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          aria-label={siteConfig.name}
        >
          <span className="inline-flex items-center justify-center rounded-md bg-white p-1.5">
            <Image
              src="/icon.png"
              alt={`${siteConfig.name} logo`}
              width={34}
              height={34}
              priority
              className="h-[34px] w-[34px]"
            />
          </span>
          <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.16em] text-white">
            {siteConfig.shortName}
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {siteConfig.navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm transition ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 h-px w-full bg-cyan-300"
                  />
                )}
              </Link>
            );
          })}
          <Magnetic>
            <ButtonLink href="/contact" className="px-4 py-2 text-xs">
              Start a Project
            </ButtonLink>
          </Magnetic>
        </nav>
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-md border border-white/20 p-2 text-white md:hidden"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/10 bg-[#08090A]/95 px-4 py-5 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {siteConfig.navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-2 py-3 text-white/90 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <ButtonLink
                href="/contact"
                className="mt-2 justify-center"
                onClick={() => setIsOpen(false)}
              >
                Start a Project
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
