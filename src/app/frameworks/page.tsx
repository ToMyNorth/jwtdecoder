import type { Metadata } from "next";
import Link from "next/link";
import { frameworks, Framework } from "@/data/frameworks";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "JWT Authentication Frameworks Guide | JWT Decoder Pro",
  description:
    "Complete guides for implementing JWT authentication in 12 popular frameworks — Next.js, React, Vue, Angular, Express, Django, Flask, FastAPI, Spring Boot, Laravel, NestJS, and Ruby on Rails.",
  alternates: {
    canonical: `${siteConfig.url}/frameworks`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/frameworks`,
    title: "JWT Authentication Frameworks Guide | JWT Decoder Pro",
    description:
      "Step-by-step JWT authentication guides for 12 popular web frameworks with code examples and best practices.",
    siteName: siteConfig.name,
  },
};

const categoryOrder: Array<{ key: Framework["category"]; label: string; description: string }> = [
  {
    key: "frontend",
    label: "Frontend Frameworks",
    description:
      "Client-side frameworks for building user interfaces. JWT tokens are typically decoded on the client and sent to an API backend for verification.",
  },
  {
    key: "backend",
    label: "Backend Frameworks",
    description:
      "Server-side frameworks for building APIs. JWT tokens are generated and verified on the server, providing stateless authentication.",
  },
  {
    key: "fullstack",
    label: "Fullstack Frameworks",
    description:
      "Frameworks that handle both client and server rendering. JWT can be used in middleware, server components, and API routes.",
  },
];

function FrameworkCard({ f }: { f: Framework }) {
  return (
    <Link
      href={`/frameworks/${f.slug}`}
      className="group flex flex-col p-5 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {f.name.charAt(0)}
        </div>
        <h2 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {f.name}
        </h2>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
        {f.description}
      </p>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400 font-mono">{f.jwtLibrary}</span>
        <span className="text-xs font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          View Guide →
        </span>
      </div>
    </Link>
  );
}

export default function FrameworksListPage() {
  const grouped = categoryOrder.map((cat) => ({
    ...cat,
    items: frameworks.filter((f) => f.category === cat.key),
  }));

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
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JWT Authentication Frameworks",
    description: "Complete guides for JWT authentication in 12 popular web frameworks.",
    numberOfItems: frameworks.length,
    itemListElement: frameworks.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.name,
      url: `${siteConfig.url}/frameworks/${f.slug}`,
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, collectionSchema],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-900 font-medium">Frameworks</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            JWT Authentication{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Frameworks Guide
            </span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Step-by-step guides for implementing JWT authentication in 12
            popular web frameworks. Each guide includes code examples,
            recommended libraries, setup steps, and best practices.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto">
          {[
            { n: "12", label: "Frameworks" },
            { n: "3", label: "Categories" },
            { n: "100%", label: "Free" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.n}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Grouped Sections */}
        {grouped.map((group) => (
          <section key={group.key} className="mb-12">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-900">{group.label}</h2>
              <p className="text-sm text-gray-500 mt-1">{group.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((f) => (
                <FrameworkCard key={f.slug} f={f} />
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <h2 className="text-xl md:text-2xl font-bold">
            Ready to Inspect Your JWT Tokens?
          </h2>
          <p className="mt-2 text-sm md:text-base opacity-90 max-w-lg mx-auto">
            Use our free online JWT Decoder to decode, inspect, and validate
            any JWT token instantly — right in your browser.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2.5 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Try JWT Decoder Pro →
          </Link>
        </section>
      </div>
    </>
  );
}
