import type { ReactNode } from "react";

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 md:px-8 md:pt-32">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-white md:text-6xl">{title}</h1>
        <p className="mt-5 text-base leading-8 text-white/70 md:text-lg">
          {description}
        </p>
      </header>
      <div className="mt-14">{children}</div>
    </div>
  );
}
