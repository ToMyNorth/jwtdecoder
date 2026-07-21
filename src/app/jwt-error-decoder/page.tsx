import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "JWT Error Decoder - Fix Invalid, Expired, and Malformed Tokens",
  description:
    "Decode common JWT errors such as jwt malformed, invalid signature, jwt expired, invalid audience, and not before. Find causes, checks, and practical fixes.",
  alternates: {
    canonical: "/jwt-error-decoder",
  },
  openGraph: {
    title: "JWT Error Decoder",
    description:
      "A practical troubleshooting guide for common JSON Web Token errors.",
    url: `${siteConfig.url}/jwt-error-decoder`,
    type: "article",
  },
};

const errors = [
  {
    message: "jwt malformed",
    meaning: "The token does not have the expected three-part JWT structure.",
    checks: [
      "Confirm the token has exactly two dots: header.payload.signature.",
      "Remove Bearer prefixes, quotes, extra spaces, or line breaks before decoding.",
      "Make sure you are not passing an opaque session token instead of a JWT.",
    ],
    fix: "Pass only the raw JWT string to your verifier or decoder.",
  },
  {
    message: "invalid signature",
    meaning: "The token was signed with a different secret, private key, or algorithm than your verifier expects.",
    checks: [
      "Compare the alg value in the JWT header with your configured algorithm.",
      "Use the correct HS256 secret or RS256/ES256 public key for the issuer.",
      "Check that environment variables are loaded in the runtime that verifies the token.",
    ],
    fix: "Verify with the expected algorithm and key pair for the token issuer.",
  },
  {
    message: "jwt expired",
    meaning: "The exp claim is in the past, so the token should no longer be accepted.",
    checks: [
      "Decode exp and compare it with the current Unix timestamp.",
      "Check server clock drift if tokens expire immediately after issue.",
      "Confirm your refresh-token flow requests a new access token before expiry.",
    ],
    fix: "Refresh the access token or ask the user to sign in again.",
  },
  {
    message: "jwt not active",
    meaning: "The nbf claim says the token is not valid yet.",
    checks: [
      "Decode nbf and compare it with the server time.",
      "Look for clock skew between your issuer and API servers.",
      "Avoid issuing tokens with future not-before values unless you need delayed validity.",
    ],
    fix: "Wait until nbf is reached or allow a small, intentional clock-skew window.",
  },
  {
    message: "invalid audience",
    meaning: "The aud claim does not match the API or application that received the token.",
    checks: [
      "Decode aud and compare it with the expected API identifier.",
      "Do not reuse tokens issued for one service against another service.",
      "Check OAuth or Auth0 audience settings when access tokens are issued.",
    ],
    fix: "Request a token for the correct audience and enforce that audience server-side.",
  },
  {
    message: "invalid issuer",
    meaning: "The iss claim does not match the authority your API trusts.",
    checks: [
      "Decode iss and compare the exact URL or identifier, including trailing slash behavior.",
      "Make sure development, staging, and production issuers are not mixed.",
      "For multi-tenant systems, resolve trusted issuers before verification.",
    ],
    fix: "Configure the verifier with the trusted issuer that actually issued the token.",
  },
];

const quickFlow = [
  "Paste the token into the JWT decoder and confirm it is structurally valid.",
  "Read the header alg and kid values before choosing a verification key.",
  "Check exp, nbf, iss, aud, and sub claims against your server expectations.",
  "Verify the signature server-side with the expected algorithm and key.",
  "Refresh or reissue the token only after you know which validation check failed.",
];

export default function JWTErrorDecoderPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does jwt malformed mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It usually means the value is not a valid three-part JWT. Remove prefixes, spaces, quotes, or line breaks and make sure you are passing the raw token string.",
        },
      },
      {
        "@type": "Question",
        name: "How do I fix invalid signature for a JWT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check the JWT header algorithm, then verify with the exact secret or public key used by the issuer. Invalid signature often comes from using the wrong key, wrong algorithm, or missing environment variable.",
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
          <li className="font-medium text-gray-800">JWT Error Decoder</li>
        </ol>
      </nav>

      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Troubleshooting guide
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          JWT Error Decoder
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Match common JWT error messages to the exact validation step that
          failed, then fix malformed, expired, invalid-signature, issuer, and
          audience problems without guessing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Decode a JWT
          </Link>
          <Link
            href="/jwt-claims-cheat-sheet"
            className="inline-flex rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
          >
            Check JWT claims
          </Link>
        </div>
      </header>

      <section className="mt-10 rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-xl font-bold text-gray-900">Common JWT errors and fixes</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use the exact error text from your library, API gateway, or auth
            middleware, then work through the checks in order.
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {errors.map((error) => (
            <section key={error.message} className="px-5 py-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <code className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-sm font-semibold text-indigo-700">
                    {error.message}
                  </code>
                  <p className="mt-3 text-sm leading-6 text-gray-700">{error.meaning}</p>
                </div>
                <p className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-900 md:max-w-xs">
                  Fix: {error.fix}
                </p>
              </div>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">
                {error.checks.map((check) => (
                  <li key={check} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    {check}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-[1fr_0.85fr]">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Debugging flow</h2>
          <ol className="mt-5 space-y-3">
            {quickFlow.map((item, index) => (
              <li key={item} className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-bold text-gray-900">Do not fix by disabling checks</h2>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            A JWT error is useful signal. Avoid turning off issuer, audience,
            expiration, or signature checks just to make a request pass. Decode
            the token for inspection, then keep trust decisions on the server.
          </p>
          <Link
            href="/blog/jwt-security-best-practices"
            className="mt-4 inline-block text-sm font-semibold text-indigo-700 hover:underline"
          >
            Review JWT security best practices
          </Link>
        </aside>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900">Can a JWT decode but still be invalid?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Yes. Decoding only reads the header and payload. A token can decode
              cleanly and still fail signature, expiration, audience, issuer, or
              authorization checks.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900">Why does my token work locally but fail in production?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Common causes include different environment variables, a different
              issuer URL, missing public keys, clock drift, or a production API
              expecting a different audience value.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
