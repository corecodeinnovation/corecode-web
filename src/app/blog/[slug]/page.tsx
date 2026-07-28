import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { PluggableList } from "unified";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

const rehypePlugins: PluggableList = [
  [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: false }],
];

const mdxOptions = { rehypePlugins };

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Link
        href="/blog"
        className="font-mono text-sm text-cci-muted transition-colors hover:text-cci-text"
      >
        ← Blog
      </Link>

      <header className="mt-8 flex flex-col gap-3 border-b border-cci-line pb-8">
        <time dateTime={post.meta.date} className="font-mono text-xs text-cci-slate">
          {formatDate(post.meta.date)}
        </time>
        <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {post.meta.title}
        </h1>
        {post.meta.tags.length > 0 && (
          <p className="font-mono text-xs text-cci-slate">
            {post.meta.tags.map((tag) => `#${tag}`).join("  ")}
          </p>
        )}
      </header>

      <div className="prose-cci mt-8">
        <MDXRemote source={post.content} options={{ mdxOptions }} />
      </div>
    </article>
  );
}
