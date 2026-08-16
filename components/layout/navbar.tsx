"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 24);
      setHidden(currentY > lastY && currentY > 120);
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-white/15 bg-zinc-900/82 backdrop-blur-xl"
          : "border-white/10 bg-zinc-900/45 backdrop-blur-xl"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2" aria-label={siteConfig.name}>
          <span className="inline-flex items-center justify-center rounded-md bg-white p-1.5 shadow-sm">
            <Image
              src="/icon.png"
              alt={`${siteConfig.name} logo`}
              width={34}
              height={34}
              priority
              className="h-[34px] w-[34px]"
            />
          </span>
          <span className="text-sm font-bold tracking-[0.16em] text-white">
            {siteConfig.shortName}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${
                  active ? "text-cyan-300" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ButtonLink href="/contact" className="px-4 py-2 text-xs">
            Start a Project
          </ButtonLink>
        </nav>
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-md border border-white/20 p-2 text-white md:hidden"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-white/10 bg-zinc-950/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {siteConfig.navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded px-2 py-2 text-white/90 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/contact" className="mt-2 justify-center">
              Start a Project
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
