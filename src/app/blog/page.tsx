import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blogContent";

export const metadata: Metadata = {
  title: "Blog - JWT Guides, Security Tips & Authentication Tutorials",
  description:
    "Read our blog for expert guides on JSON Web Tokens, JWT security best practices, authentication strategies, and token inspection techniques.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Blog</h1>
      <p className="mt-3 text-gray-600">
        JWT guides, security best practices, and authentication tutorials to
        help you build secure applications.
      </p>

      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-5 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-2 text-lg md:text-xl font-bold text-gray-800">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {post.description}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
