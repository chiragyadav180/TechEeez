import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, estimateReadingTime, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

export default async function BlogArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const related = blogPosts
    .filter((entry) => entry.slug !== post.slug)
    .filter((entry) => entry.category === post.category)
    .slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    description: post.seoDescription,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-30 md:px-8 md:pt-34">
      <p className="text-xs text-cyan-300">{post.category}</p>
      <h1 className="mt-3 text-4xl leading-tight text-white md:text-6xl">
        {post.title}
      </h1>
      <p className="mt-5 text-sm text-white/60">
        {post.author} • {post.publishedAt} • {estimateReadingTime(post)} min read
      </p>
      <p className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
        {post.excerpt}
      </p>
      <article className="mt-8 space-y-5 text-base leading-8 text-white/80">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl text-white">Related articles</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {related.map((entry) => (
              <Link
                key={entry.slug}
                href={`/blog/${entry.slug}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white hover:border-cyan-300/40"
              >
                <p className="text-xs text-cyan-300">{entry.category}</p>
                <p className="mt-2 text-lg">{entry.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 rounded-2xl border border-cyan-300/30 bg-cyan-400/10 p-6">
        <h2 className="text-2xl text-white">Need help implementing this?</h2>
        <p className="mt-2 text-sm text-white/70">
          Talk to Tech Eeez about your project roadmap.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-zinc-900"
        >
          Contact Tech Eeez
        </Link>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]),
        }}
      />
    </div>
  );
}
