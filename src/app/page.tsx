import type { Metadata } from "next";
import JWTDecoder from "@/components/JWTDecoder";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section aria-label="Introduction">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Free Online{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              JWT Decoder
            </span>{" "}
            &amp; Parser
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Instantly decode, inspect, and validate JSON Web Tokens. View header,
            payload, claims, and expiration status — all securely in your browser.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section aria-label="JWT Decoder Tool">
        <JWTDecoder />
      </section>

      {/* SEO Content Section */}
      <section aria-label="JWT Educational Content" className="mt-12 md:mt-16 prose max-w-none">
        <h2>What Is a JWT?</h2>
        <p>
          A JSON Web Token (JWT) is a compact, URL-safe means of representing
          claims to be transferred between two parties. JWTs are commonly used
          for authentication and authorization in modern web applications and
          APIs. A JWT consists of three parts — a header, a payload, and a
          signature — encoded as a Base64Url string and separated by dots.
        </p>

        <h2>How to Use This JWT Decoder</h2>
        <p>Using our JWT decoder is simple and fast:</p>
        <ol role="list">
          <li>
            <strong>Step 1 — Paste your token:</strong> Copy a JWT from your application
            or click the &ldquo;Sample&rdquo; button to load a test token.
          </li>
          <li>
            <strong>Step 2 — Instant decoding:</strong> The tool automatically decodes
            the header and payload in real-time as you type or paste.
          </li>
          <li>
            <strong>Step 3 — Inspect the results:</strong> View the formatted header,
            payload claims, signature, algorithm details, and expiration
            status.
          </li>
          <li>
            <strong>Step 4 — Copy or clear:</strong> Use the action buttons to copy the
            token or clear the input.
          </li>
        </ol>

        <h2>JWT Structure Explained</h2>
        <p>
          A JWT is composed of three Base64Url-encoded parts, separated by
          dots:
        </p>
        <ul role="list">
          <li>
            <strong>Header:</strong> Contains metadata about the token type
            (typically &ldquo;JWT&rdquo;) and the signing algorithm used (e.g.,
            HS256, RS256).
          </li>
          <li>
            <strong>Payload:</strong> Contains the claims — statements about an
            entity (usually the user) and additional data. Claims can be
            registered (like <code>iss</code>, <code>exp</code>,{" "}
            <code>sub</code>), public, or private.
          </li>
          <li>
            <strong>Signature:</strong> Created by signing the encoded header
            and payload with a secret or private key. The signature ensures the
            token hasn&apos;t been tampered with.
          </li>
        </ul>

        <h2>Common JWT Claims</h2>
        <p>
          JWTs include standard registered claims that provide important
          metadata:
        </p>
        <ul role="list">
          <li>
            <strong>iss (Issuer):</strong> The principal that issued the token.
          </li>
          <li>
            <strong>sub (Subject):</strong> The subject of the token, often the
            user ID.
          </li>
          <li>
            <strong>aud (Audience):</strong> The intended recipient of the
            token.
          </li>
          <li>
            <strong>exp (Expiration Time):</strong> The time after which the
            token is no longer valid.
          </li>
          <li>
            <strong>iat (Issued At):</strong> The time the token was issued.
          </li>
          <li>
            <strong>nbf (Not Before):</strong> The time before which the token
            must not be accepted.
          </li>
          <li>
            <strong>jti (JWT ID):</strong> A unique identifier for the token.
          </li>
        </ul>

        <h2>Is This JWT Decoder Secure?</h2>
        <p>
          Yes. Our JWT decoder runs entirely in your browser. Your token is
          never sent to any server, stored, or shared. All decoding and parsing
          happens locally on your device, ensuring complete privacy and
          security. You can safely decode sensitive tokens without worrying
          about data leakage.
        </p>

        <section aria-label="Frequently Asked Questions">
          <h2>Frequently Asked Questions</h2>
          <h3>What does a JWT decoder do?</h3>
          <p>
            A JWT decoder takes a Base64Url-encoded JWT string and decodes it into
            its three components: the header, the payload (containing claims),
            and the signature. It formats the JSON for easy reading and displays
            additional information like expiration status and algorithm details.
          </p>
          <h3>Can this tool validate JWT signatures?</h3>
          <p>
            This tool decodes and inspects JWTs but does not perform cryptographic
            signature verification. Signature verification requires the secret or
            public key, which should be done server-side in your application.
          </p>
          <h3>Is decoding a JWT safe?</h3>
          <p>
            Yes. Decoding a JWT simply reads the Base64Url-encoded content. The
            payload and header are not encrypted — they are only encoded.
            However, the signature ensures integrity, so never trust a
            token&apos;s claims without verifying its signature on your server.
          </p>
          <h3>Can I use this tool on my phone?</h3>
          <p>
            Yes! Our JWT decoder is fully responsive and works on all devices
            including phones, tablets, and desktop computers.
          </p>
        </section>
      </section>

      {/* CTA */}
      <section aria-label="Call to Action" className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <h2 className="text-xl md:text-2xl font-bold">
          Want to learn more about JWT?
        </h2>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Check out our blog for in-depth guides on JWT structure, security best
          practices, and authentication strategies.
        </p>
        <Link
          href="/blog"
          className="inline-block mt-4 px-6 py-2.5 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Read Our Blog
        </Link>
      </section>
    </article>
  );
}
