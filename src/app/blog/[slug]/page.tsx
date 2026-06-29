import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blogContent";
import { siteConfig } from "@/lib/siteConfig";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPost(slug);
    if (!post) return {};

    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        url: `${siteConfig.url}/blog/${post.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
    } as Metadata;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = getAllBlogPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: siteConfig.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
      >
        ← Back to Blog
      </Link>

      <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
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

      <h1 className="mt-2 text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
        {post.title}
      </h1>

      <p className="mt-4 text-lg text-gray-600">{post.description}</p>

      <div className="mt-8 prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      </div>

      <div className="mt-8 p-5 rounded-xl bg-indigo-50 border border-indigo-200">
        <p className="text-sm text-gray-600">
          Need to decode a JWT token?{" "}
          <Link href="/" className="font-medium text-indigo-600">
            Try our free JWT decoder tool
          </Link>{" "}
          — no sign-up required, runs entirely in your browser.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">Related Articles</h2>
        <div className="mt-4 space-y-4">
          {otherPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block p-4 rounded-lg border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <div className="text-xs text-gray-500">{p.readingTime}</div>
              <div className="mt-1 font-semibold text-gray-800 group-hover:text-indigo-600">
                {p.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Simple markdown to HTML renderer (headers, paragraphs, lists, bold, links, code blocks)
function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  let html = "";
  let inList = false;
  let listType = "";
  let inCodeBlock = false;
  let codeContent = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // Close code block
        html += `<pre><code>${escapeHtml(codeContent)}</code></pre>`;
        codeContent = "";
        inCodeBlock = false;
      } else {
        // Close any open list
        if (inList) {
          html += `</${listType}>`;
          inList = false;
        }
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + "\n";
      continue;
    }

    // Close list if needed
    const trimmed = line.trim();
    if (inList && !trimmed.startsWith("- ") && !/^\d+\.\s/.test(trimmed)) {
      html += `</${listType}>`;
      inList = false;
    }

    // Headers
    if (line.startsWith("### ")) {
      html += `<h3>${inlineFormat(line.slice(4))}</h3>`;
    } else if (line.startsWith("## ")) {
      html += `<h2>${inlineFormat(line.slice(3))}</h2>`;
    } else if (line.startsWith("> ")) {
      html += `<blockquote>${inlineFormat(line.slice(2))}</blockquote>`;
    } else if (line.trim().startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
        listType = "ul";
      }
      html += `<li>${inlineFormat(line.trim().slice(2))}</li>`;
    } else if (/^\d+\.\s/.test(line.trim())) {
      if (!inList || listType !== "ol") {
        if (inList) html += `</${listType}>`;
        html += "<ol>";
        inList = true;
        listType = "ol";
      }
      html += `<li>${inlineFormat(line.trim().replace(/^\d+\.\s/, ""))}</li>`;
    } else if (line.trim() === "") {
      // Empty line
    } else {
      html += `<p>${inlineFormat(line)}</p>`;
    }
  }

  if (inList) {
    html += `</${listType}>`;
  }

  if (inCodeBlock) {
    html += `<pre><code>${escapeHtml(codeContent)}</code></pre>`;
  }

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineFormat(text: string): string {
  // Escape HTML first
  text = escapeHtml(text);
  // Inline code
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Links [text](url) - XSS prevention: only allow http(s) and relative paths
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, linkText: string, url: string) => {
      // Only allow safe URLs: http(s):// or relative paths starting with /
      const isSafeUrl =
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("/");
      if (isSafeUrl) {
        return `<a href="${url}">${linkText}</a>`;
      }
      // For unsafe protocols (javascript:, data:, etc.), render as plain text
      return `${linkText} (${url})`;
    }
  );
  return text;
}
