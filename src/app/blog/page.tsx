import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas técnicas de Core Code Innovation: arquitectura, DevOps, IA y homelab.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Blog</h1>
      <p className="mt-4 text-cci-muted">
        Notas técnicas del día a día: arquitectura, DevOps, IA y lo que va saliendo del homelab.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 rounded-cci border border-cci-line bg-cci-surface p-6 text-sm text-cci-muted">
          Todavía no hay publicaciones. Pronto.
        </p>
      ) : (
        <ul className="mt-12 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 rounded-cci border border-cci-line bg-cci-surface p-6 transition-colors hover:border-cci-slate-600 hover:bg-cci-surface-2"
              >
                <time dateTime={post.date} className="font-mono text-xs text-cci-slate">
                  {formatDate(post.date)}
                </time>
                <h2 className="font-display text-xl font-semibold transition-colors group-hover:text-cci-orange">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-cci-muted">{post.description}</p>
                {post.tags.length > 0 && (
                  <p className="mt-1 font-mono text-xs text-cci-slate">
                    {post.tags.map((tag) => `#${tag}`).join("  ")}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
