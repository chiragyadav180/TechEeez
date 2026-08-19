import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300";
  const styles =
    variant === "primary"
      ? "bg-cyan-300 text-zinc-950 hover:-translate-y-0.5 hover:bg-cyan-200"
      : "border border-white/20 text-white hover:border-cyan-300/70 hover:text-cyan-100";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
