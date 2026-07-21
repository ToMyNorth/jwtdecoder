import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "JWT Claims Cheat Sheet - Registered Claims Explained",
  description:
    "A practical JWT claims cheat sheet for developers. Learn what iss, sub, aud, exp, nbf, iat, and jti mean, when to use them, and common validation mistakes.",
  alternates: {
    canonical: "/jwt-claims-cheat-sheet",
  },
  openGraph: {
    title: "JWT Claims Cheat Sheet",
    description:
      "Quick reference for registered JWT claims, validation rules, and common mistakes.",
    url: `${siteConfig.url}/jwt-claims-cheat-sheet`,
    type: "article",
  },
};

const registeredClaims = [
  {
    claim: "iss",
    name: "Issuer",
    meaning: "Identifies the authority that issued the token.",
    validate: "Compare against the exact issuer URL or identifier you trust.",
    mistake: "Accepting tokens from any issuer because the signature is valid.",
  },
  {
    claim: "sub",
    name: "Subject",
    meaning: "Identifies the principal the token is about, usually a user ID.",
    validate: "Treat it as an identifier, not as proof of permissions by itself.",
    mistake: "Using an email address as a permanent subject when users can change email.",
  },
  {
    claim: "aud",
    name: "Audience",
    meaning: "Identifies the API, service, or client the token is intended for.",
    validate: "Reject tokens whose audience does not include your application.",
    mistake: "Reusing an access token meant for one API against another API.",
  },
  {
    claim: "exp",
    name: "Expiration Time",
    meaning: "Unix timestamp after which the token must not be accepted.",
    validate: "Reject expired tokens, allowing only a small clock-skew window if needed.",
    mistake: "Decoding exp for display but forgetting to enforce it server-side.",
  },
  {
    claim: "nbf",
    name: "Not Before",
    meaning: "Unix timestamp before which the token must not be accepted.",
    validate: "Reject tokens used before this time.",
    mistake: "Ignoring nbf in systems that issue scheduled or delayed-validity tokens.",
  },
  {
    claim: "iat",
    name: "Issued At",
    meaning: "Unix timestamp showing when the token was issued.",
    validate: "Use it for age checks, auditing, and suspicious-token detection.",
    mistake: "Treating iat as an expiration policy without also checking exp.",
  },
  {
    claim: "jti",
    name: "JWT ID",
    meaning: "Unique token identifier used for replay protection or revocation.",
    validate: "Store or check it when your system supports token revocation.",
    mistake: "Adding jti but never using it in revocation or replay checks.",
  },
];

const validationChecklist = [
  "Verify the signature with the expected algorithm and key.",
  "Reject tokens using unexpected algorithms, including none.",
  "Check iss, aud, exp, nbf, and any required custom claims.",
  "Keep sensitive data out of JWT payloads because JWTs are encoded, not encrypted.",
  "Use short-lived access tokens and rotate refresh tokens when possible.",
  "Perform authorization checks on the server, not only in frontend code.",
];

export default function JWTClaimsCheatSheetPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are JWT claims encrypted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard JWT header and payload values are Base64Url encoded, not encrypted. Anyone with the token can decode and read them unless you use JWE encryption.",
        },
      },
      {
        "@type": "Question",
        name: "Which JWT claims should every API validate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most APIs should validate the signature, issuer, audience, expiration time, not-before time when present, and any application-specific authorization claims.",
        },
      },
    ],
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li className="font-medium text-gray-800">JWT Claims Cheat Sheet</li>
        </ol>
      </nav>

      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Developer reference
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          JWT Claims Cheat Sheet
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          A practical guide to registered JWT claims, what each claim means, and
          how to validate tokens safely in real applications.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Decode a JWT
          </Link>
        </div>
      </header>

      <section className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[0.7fr_1fr_1.5fr_1.5fr_1.5fr] bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <div>Claim</div>
          <div>Name</div>
          <div>Meaning</div>
          <div>Validate</div>
          <div>Common mistake</div>
        </div>
        <div className="divide-y divide-gray-100">
          {registeredClaims.map((item) => (
            <div
              key={item.claim}
              className="grid gap-3 px-4 py-4 text-sm text-gray-700 md:grid-cols-[0.7fr_1fr_1.5fr_1.5fr_1.5fr]"
            >
              <code className="font-mono text-base font-bold text-indigo-700">{item.claim}</code>
              <div className="font-semibold text-gray-900">{item.name}</div>
              <div>{item.meaning}</div>
              <div>{item.validate}</div>
              <div>{item.mistake}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-[1fr_0.85fr]">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">JWT validation checklist</h2>
          <ul className="mt-5 space-y-3">
            {validationChecklist.map((item) => (
              <li key={item} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <h2 className="text-lg font-bold text-gray-900">Quick rule</h2>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            Decoding a JWT helps you inspect the claims, but decoding is not the
            same as trusting. Production systems should verify the signature and
            validate claim values on the server before making authorization
            decisions.
          </p>
          <Link
            href="/blog/jwt-security-best-practices"
            className="mt-4 inline-block text-sm font-semibold text-indigo-700 hover:underline"
          >
            Read JWT security best practices →
          </Link>
        </aside>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900">Are JWT claims encrypted?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              No. Standard JWT payloads are encoded, not encrypted. Avoid putting
              passwords, API keys, private profile data, or payment information
              into a JWT payload.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900">What custom claims are safe?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Custom claims should be minimal and non-sensitive, such as role IDs,
              tenant IDs, feature flags, or permission scopes that your server
              still validates.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
