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

      {/* Collapsible Content Sections */}
      <section aria-label="Additional Information" className="mt-12 md:mt-16 border-t border-gray-200 pt-10 md:pt-12">
        <div className="space-y-4">
          {/* What is JWT? */}
          <details className="group rounded-xl border border-gray-200 bg-gray-50/70 overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-lg font-semibold text-gray-900 select-none hover:bg-gray-100/80 transition-colors list-none">
              <h2 className="text-lg font-semibold m-0">What is JWT?</h2>
              <svg className="w-5 h-5 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 text-gray-700 space-y-3">
              <p>
                A <strong>JSON Web Token (JWT)</strong> is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.
              </p>
              <h3 className="text-base font-semibold text-gray-800 mt-4">The Three Parts of a JWT</h3>
              <ul role="list" className="list-disc pl-5 space-y-1.5">
                <li><strong>Header:</strong> Contains the token type ("JWT") and the signing algorithm (e.g., HS256, RS256). It is Base64Url-encoded to form the first part of the token.</li>
                <li><strong>Payload:</strong> Contains the claims — statements about an entity and additional data. Claims include user information, permissions, and token metadata like expiration time.</li>
                <li><strong>Signature:</strong> Created by signing the encoded header and payload with a secret or private key. It verifies that the token was not altered in transit.</li>
              </ul>
              <h3 className="text-base font-semibold text-gray-800 mt-4">Common Use Cases</h3>
              <ul role="list" className="list-disc pl-5 space-y-1.5">
                <li><strong>Authentication:</strong> JWTs are widely used for single sign-on (SSO) and session management. Once a user logs in, a JWT is returned and stored client-side, then sent with each subsequent request.</li>
                <li><strong>Information Exchange:</strong> JWTs provide a compact way to securely transmit data between parties, ensuring the data has not been tampered with thanks to the digital signature.</li>
              </ul>
            </div>
          </details>

          {/* How to Use */}
          <details className="group rounded-xl border border-gray-200 bg-gray-50/70 overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-lg font-semibold text-gray-900 select-none hover:bg-gray-100/80 transition-colors list-none">
              <h2 className="text-lg font-semibold m-0">How to Use</h2>
              <svg className="w-5 h-5 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 text-gray-700 space-y-3">
              <p>Decoding a JWT with our tool is quick and easy. Follow these steps:</p>
              <ol role="list" className="list-decimal pl-5 space-y-2">
                <li><strong>Paste your JWT token</strong> into the input box at the top of the page. You can also click the &ldquo;Sample&rdquo; button to load a test token.</li>
                <li><strong>Click the &ldquo;Decode&rdquo; button</strong> — or simply let the tool decode automatically as you paste.</li>
                <li><strong>View the decoded Header and Payload</strong> displayed in a clean, formatted JSON view below the input.</li>
                <li><strong>Copy the results</strong> using the copy button, or download the decoded output as a JSON file for further analysis.</li>
              </ol>
              <p className="mt-2">That&apos;s it — no sign-up, no installation, and no data leaves your browser.</p>
            </div>
          </details>

          {/* FAQ */}
          <details className="group rounded-xl border border-gray-200 bg-gray-50/70 overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-lg font-semibold text-gray-900 select-none hover:bg-gray-100/80 transition-colors list-none">
              <h2 className="text-lg font-semibold m-0">FAQ</h2>
              <svg className="w-5 h-5 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 text-gray-700">
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-gray-800">Q: Is my JWT token safe?</dt>
                  <dd className="mt-1 ml-0">Yes, all decoding happens entirely in your browser. We never store, transmit, or log your tokens. Your data stays on your device.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Q: What is a JWT used for?</dt>
                  <dd className="mt-1 ml-0">JWTs are commonly used for authentication and secure information exchange between a client and a server.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Q: Can I decode expired tokens?</dt>
                  <dd className="mt-1 ml-0">Yes, you can decode any JWT regardless of its expiration status. The tool will show you the expiration claim so you can check it yourself.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Q: What does &ldquo;Invalid token&rdquo; mean?</dt>
                  <dd className="mt-1 ml-0">It means the input does not match the expected JWT format (three Base64Url-encoded parts separated by dots). Check for typos, extra spaces, or missing characters.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Q: Is this tool free?</dt>
                  <dd className="mt-1 ml-0">Yes, it is completely free with no usage limits, no sign-up required.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Q: Can I use this on mobile?</dt>
                  <dd className="mt-1 ml-0">Yes, our tool is fully responsive and works on all devices including smartphones, tablets, and desktop computers.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Q: Do you store my tokens?</dt>
                  <dd className="mt-1 ml-0">No, everything is processed locally in your browser. No token data is ever sent to or stored on any server.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Q: What algorithms are supported?</dt>
                  <dd className="mt-1 ml-0">We support HS256, RS256, ES256, PS256, and other common JWT signing algorithms. The algorithm used is always displayed in the decoded header.</dd>
                </div>
              </dl>
            </div>
          </details>
        </div>
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
