import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/page-shell";
import { blogPosts, estimateReadingTime } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Educational articles on web, mobile, cloud, analytics, cybersecurity, and integration.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <PageShell
      title="Insights for modern digital growth."
      description="Practical educational content from the Tech Eeez editorial team."
    >
      <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Featured</p>
        <h2 className="mt-3 text-3xl text-white">{featured.title}</h2>
        <p className="mt-3 text-white/70">{featured.excerpt}</p>
        <div className="mt-4 text-xs text-white/50">
          {featured.category} • {estimateReadingTime(featured)} min read
        </div>
        <Link
          href={`/blog/${featured.slug}`}
          className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-zinc-900"
        >
          Read article
        </Link>
      </article>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {rest.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-xs text-cyan-300">{post.category}</p>
            <h3 className="mt-2 text-xl text-white">{post.title}</h3>
            <p className="mt-3 text-sm text-white/70">{post.excerpt}</p>
            <div className="mt-4 text-xs text-white/50">
              {estimateReadingTime(post)} min read
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex text-sm text-cyan-300 hover:text-cyan-200"
            >
              Continue reading →
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
