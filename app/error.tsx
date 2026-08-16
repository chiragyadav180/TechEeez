"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl items-center justify-center px-4 pt-32 md:px-8">
      <div className="w-full rounded-2xl border border-rose-400/30 bg-rose-400/10 p-6">
        <h2 className="text-2xl text-rose-950">Something went wrong</h2>
        <p className="mt-3 text-sm text-rose-900">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-full bg-rose-700 px-5 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
