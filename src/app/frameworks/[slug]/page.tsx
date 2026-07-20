import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  frameworks,
  getFrameworkBySlug,
  getAllFrameworkSlugs,
} from "@/data/frameworks";
import { siteConfig } from "@/lib/siteConfig";

export function generateStaticParams() {
  return getAllFrameworkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const framework = getFrameworkBySlug(slug);
  if (!framework) return {};

  const title = `JWT Authentication in ${framework.name} - Complete Guide`;
  const description = `Learn how to implement JWT authentication in ${framework.name}. Complete guide covering ${framework.jwtLibrary}, code examples, setup steps, and best practices for secure token-based auth.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/frameworks/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/frameworks/${slug}`,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${encodeURIComponent(`JWT in ${framework.name}`)}&description=${encodeURIComponent("Complete Authentication Guide")}`,
          width: 1200,
          height: 630,
          alt: `JWT Authentication in ${framework.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `${siteConfig.url}/api/og?title=${encodeURIComponent(`JWT in ${framework.name}`)}&description=${encodeURIComponent("Complete Authentication Guide")}`,
      ],
    },
  };
}

export default async function FrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const framework = getFrameworkBySlug(slug);
  if (!framework) notFound();

  // Related frameworks: same category, excluding current
  const related = frameworks
    .filter((f) => f.category === framework.category && f.slug !== slug)
    .slice(0, 3);

  // If not enough related, fill from other categories
  if (related.length < 2) {
    const others = frameworks
      .filter(
        (f) =>
          f.category !== framework.category &&
          f.slug !== slug &&
          !related.find((r) => r.slug === f.slug)
      )
      .slice(0, 3 - related.length);
    related.push(...others);
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Frameworks",
        item: `${siteConfig.url}/frameworks`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: framework.name,
        item: `${siteConfig.url}/frameworks/${slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `JWT Authentication in ${framework.name}: Complete Guide`,
    description: framework.description,
    url: `${siteConfig.url}/frameworks/${slug}`,
    datePublished: "2025-01-20",
    dateModified: "2025-01-20",
    author: { "@type": "Organization", name: siteConfig.author },
    publisher: { "@type": "Organization", name: siteConfig.author },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/frameworks/${slug}`,
    },
    articleSection: "Authentication",
    keywords: [
      `jwt authentication in ${framework.name.toLowerCase()}`,
      `${framework.name.toLowerCase()} jwt`,
      `${framework.jwtLibrary}`,
      "json web token",
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, articleSchema],
  };

  const categoryLabel =
    framework.category === "frontend"
      ? "Frontend"
      : framework.category === "backend"
        ? "Backend"
        : "Fullstack";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/frameworks"
            className="hover:text-indigo-600 transition-colors"
          >
            Frameworks
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-900 font-medium">{framework.name}</span>
        </nav>

        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
            {categoryLabel}
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
          JWT Authentication in{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {framework.name}
          </span>
          : Complete Guide
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          {framework.description} This guide walks you through everything you
          need to implement robust JWT authentication in {framework.name},
          from choosing the right library to writing production-ready code.
        </p>

        {/* Table of Contents */}
        <section
          aria-label="Table of Contents"
          className="mb-10 p-5 rounded-xl border border-gray-200 bg-gray-50"
        >
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
            In This Guide
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li>
              <a
                href="#recommended-library"
                className="text-indigo-600 hover:underline"
              >
                Recommended JWT Library
              </a>
            </li>
            <li>
              <a
                href="#code-example"
                className="text-indigo-600 hover:underline"
              >
                Code Example
              </a>
            </li>
            <li>
              <a
                href="#setup-steps"
                className="text-indigo-600 hover:underline"
              >
                Setup Steps
              </a>
            </li>
            <li>
              <a
                href="#key-features"
                className="text-indigo-600 hover:underline"
              >
                Key Features
              </a>
            </li>
            <li>
              <a
                href="#related-frameworks"
                className="text-indigo-600 hover:underline"
              >
                Related Frameworks
              </a>
            </li>
          </ul>
        </section>

        {/* Recommended Library */}
        <section id="recommended-library" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recommended JWT Library for {framework.name}
          </h2>
          <div className="p-5 rounded-xl border border-gray-200 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {framework.jwtLibrary.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {framework.jwtLibrary}
                </h3>
                <p className="text-gray-600 mt-1">
                  The recommended library for handling JWT authentication in{" "}
                  {framework.name}. It provides a mature API, active
                  maintenance, and wide community adoption — making it the
                  go-to choice for production applications built with{" "}
                  {framework.name}.
                </p>
                <p className="text-gray-600 mt-2">
                  Whether you are building a small prototype or a large-scale
                  enterprise application, {framework.jwtLibrary} gives you the
                  tools to generate, sign, verify, and decode JWT tokens with
                  confidence. It supports all major signing algorithms
                  including HS256, RS256, and ES256, and integrates naturally
                  with the {framework.name} ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section id="code-example" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            JWT Authentication Code Example
          </h2>
          <p className="text-gray-600 mb-4">
            Below is a practical code example showing how to implement JWT
            authentication in {framework.name} using {framework.jwtLibrary}.
            This snippet demonstrates the core pattern you will use in most
            applications:
          </p>
          <div className="rounded-xl overflow-hidden border border-gray-800">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-gray-400 text-xs">
              <span>{framework.name} — JWT Example</span>
              <span className="font-mono">{framework.jwtLibrary}</span>
            </div>
            <pre className="bg-gray-950 text-gray-100 p-5 overflow-x-auto text-sm leading-relaxed">
              <code>{framework.codeExample}</code>
            </pre>
          </div>
          <p className="text-gray-500 text-sm mt-3">
            This example shows the essential JWT workflow in {framework.name}.
            In production, make sure to store secrets in environment variables,
            use HTTPS, and implement proper error handling for token expiration
            and revocation.
          </p>
        </section>

        {/* Setup Steps */}
        <section id="setup-steps" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Set Up JWT in {framework.name}
          </h2>
          <p className="text-gray-600 mb-6">
            Follow these steps to get JWT authentication working in your{" "}
            {framework.name} project. Each step builds on the previous one, so
            we recommend following them in order:
          </p>
          <ol className="space-y-4">
            {framework.setupSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-gray-800 font-medium">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Key Features */}
        <section id="key-features" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Features of JWT Auth in {framework.name}
          </h2>
          <p className="text-gray-600 mb-6">
            When you implement JWT authentication in {framework.name}, you
            gain access to several powerful capabilities that make your
            application more secure and scalable:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {framework.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50"
              >
                <svg
                  className="w-5 h-5 shrink-0 text-indigo-600 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why JWT section - extra SEO content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Use JWT Authentication in {framework.name}?
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-3">
            <p>
              {framework.name} is widely used for building modern web
              applications and APIs, and JWT has become the de facto standard
              for stateless authentication. By combining {framework.name} with
              JWT, you get a scalable authentication system that does not
              require server-side session storage.
            </p>
            <p>
              JWT tokens are self-contained, meaning they carry all the
              information needed to identify a user and their permissions.
              This makes them ideal for microservice architectures, mobile
              backends, and single-page applications built with{" "}
              {framework.name}. Each request includes the token, so your
              server can verify identity without a database lookup.
            </p>
            <p>
              The {framework.jwtLibrary} library makes it straightforward to
              implement JWT in {framework.name}. You can generate tokens on
              login, verify them on each request, and handle token refresh
              to keep users authenticated without interruption. Combined
              with proper security practices — such as short expiration
              times, refresh token rotation, and secure storage — JWT
              provides a robust foundation for any authentication system.
            </p>
          </div>
        </section>

        {/* Best Practices - extra SEO content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best Practices for JWT in {framework.name}
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-3">
            <p>
              When implementing JWT authentication in {framework.name}, follow
              these best practices to keep your application secure:
            </p>
            <ul role="list" className="list-disc pl-5 space-y-2">
              <li>
                <strong>Use strong secrets:</strong> Always use a long, random
                secret key for signing tokens. Store it in environment
                variables, never in source code.
              </li>
              <li>
                <strong>Set short expiration times:</strong> Access tokens
                should expire quickly (15–30 minutes). Use refresh tokens
                for longer sessions.
              </li>
              <li>
                <strong>Validate on every request:</strong> Always verify the
                token signature and check expiration before granting access
                to protected resources.
              </li>
              <li>
                <strong>Use HTTPS:</strong> JWT tokens sent over plain HTTP
                can be intercepted. Always use HTTPS in production to protect
                tokens in transit.
              </li>
              <li>
                <strong>Handle token refresh:</strong> Implement a refresh
                token flow so users are not logged out when their access
                token expires. Rotate refresh tokens to prevent replay attacks.
              </li>
              <li>
                <strong>Do not store sensitive data in tokens:</strong> JWT
                payloads are Base64-encoded, not encrypted. Avoid putting
                passwords or other sensitive information in claims.
              </li>
            </ul>
          </div>
        </section>

        {/* Related Frameworks */}
        <section id="related-frameworks" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Related Frameworks
          </h2>
          <p className="text-gray-600 mb-6">
            Interested in JWT authentication with other frameworks? Explore
            these guides:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((f) => (
              <Link
                key={f.slug}
                href={`/frameworks/${f.slug}`}
                className="group p-5 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {f.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {f.description}
                </p>
                <span className="inline-block mt-3 text-xs font-medium text-indigo-600">
                  View Guide →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <h2 className="text-xl md:text-2xl font-bold">
            Decode &amp; Inspect JWT Tokens Instantly
          </h2>
          <p className="mt-2 text-sm md:text-base opacity-90 max-w-lg mx-auto">
            Use our free online JWT Decoder to inspect any token — view the
            header, payload, claims, and expiration status right in your
            browser. No sign-up required.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2.5 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Try JWT Decoder Pro →
          </Link>
        </section>
      </article>
    </>
  );
}
