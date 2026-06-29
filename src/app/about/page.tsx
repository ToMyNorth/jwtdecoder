import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about JWT Decoder Pro — a free online tool for decoding and inspecting JSON Web Tokens securely in your browser.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          About JWT Decoder Pro
        </h1>

        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            JWT Decoder Pro is a free online tool that helps developers, security
            researchers, and students decode, inspect, and understand JSON Web
            Tokens (JWTs). Our mission is to provide a fast, reliable, and
            privacy-respecting way to work with JWTs — no sign-up or installation
            required.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you are debugging an authentication flow, learning how JWTs
            work, or verifying token claims, JWT Decoder Pro gives you instant
            results directly in your browser.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What We Offer
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">✓</span>
              <span>
                <strong>Instant Decoding</strong> — Paste any JWT and see the
                header, payload, and signature decoded in real time.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">✓</span>
              <span>
                <strong>Expiration Tracking</strong> — Automatically detect
                whether a token has expired or is still valid.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">✓</span>
              <span>
                <strong>Algorithm Detection</strong> — Identify the signing
                algorithm (HS256, RS256, etc.) used in each token.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">✓</span>
              <span>
                <strong>Developer Blog</strong> — Read in-depth articles about
                JWT structure, security best practices, and authentication
                patterns.
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Privacy &amp; Security
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your privacy is our top priority. <strong>All JWT decoding is performed entirely in your browser</strong> using client-side JavaScript. Your tokens are{" "}
            <strong>never sent to our servers</strong> or any third-party server.
            What you paste stays on your device.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We do not require an account, do not store any tokens, and do not
            collect personally identifiable information. For full details, please
            read our{" "}
            <Link
              href="/privacy"
              className="text-indigo-600 hover:underline font-medium"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions, feedback, or a feature request? We would love to hear
            from you. Reach out at{" "}
            <a
              href="mailto:contact@easyjwt.top"
              className="text-indigo-600 hover:underline font-medium"
            >
              contact@easyjwt.top
            </a>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
