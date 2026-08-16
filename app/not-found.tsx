import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] w-full max-w-4xl flex-col items-center justify-center px-4 text-center md:px-8">
      <p className="text-xs tracking-[0.25em] text-cyan-300">404</p>
      <h1 className="mt-3 text-4xl text-white md:text-6xl">
        Looks like this page took a wrong turn.
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-zinc-900"
      >
        Back Home
      </Link>
    </div>
  );
}
