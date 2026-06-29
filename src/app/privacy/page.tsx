import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for JWT Decoder Pro. Learn how we handle your data — we don't collect, store, or transmit your tokens.",
};

export default function PrivacyPage() {
  const lastUpdated = "June 29, 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            JWT Decoder Pro (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our website at{" "}
            <a href="https://easyjwt.top" className="text-indigo-600 hover:underline">
              easyjwt.top
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>We do not collect any personal data.</strong> Specifically:
          </p>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>
              We do not require user registration or accounts.
            </li>
            <li>
              We do not collect names, email addresses, or any personally
              identifiable information.
            </li>
            <li>
              JWT tokens you decode are processed entirely in your browser and
              are <strong>never transmitted to our servers</strong>.
            </li>
            <li>
              We do not store, log, or retain any token data.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Data Processing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All JWT decoding and parsing is performed{" "}
            <strong>client-side in your web browser</strong> using JavaScript.
            Your tokens never leave your device. No token data is sent to,
            stored on, or processed by any server operated by us or any
            third party.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Cookies &amp; Analytics
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We use minimal, privacy-respecting analytics to understand how the
            site is used and improve the service:
          </p>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>
              <strong>Vercel Analytics</strong> — We use Vercel&apos;s built-in
              analytics service, which collects anonymous, aggregated usage data
              (such as page views and visitor counts). No personally
              identifiable information is collected. Vercel Analytics does not
              use cookies to track individual users.
            </li>
            <li>
              <strong>Google Analytics</strong> — If Google Analytics is added in
              the future, it will use cookies to collect anonymous usage
              statistics. You can opt out by disabling cookies in your browser
              or by using Google&apos;s Analytics Opt-out Browser Add-on.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            We do not use advertising cookies or cross-site tracking for
            personalized advertising purposes beyond what is required by our
            hosting and analytics providers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Our website relies on the following third-party services:
          </p>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>
              <strong>Vercel Inc.</strong> — Website hosting and content
              delivery. Vercel may collect anonymous request logs (IP address,
              user agent, request URL) for security and performance purposes.
              See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Vercel&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Google</strong> — If Google Analytics or Google AdSense is
              added in the future, Google may use cookies and collect anonymous
              usage data. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Your Rights (GDPR)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you are located in the European Economic Area (EEA), you have
            certain data protection rights under the General Data Protection
            Regulation (GDPR), including:
          </p>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>The right to access any personal data we hold about you</li>
            <li>The right to rectification of inaccurate data</li>
            <li>The right to erasure of your data</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            Since we do not collect personal data, there is no data to access,
            correct, or delete. If you believe we have inadvertently collected
            your data, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Children&apos;s Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our service is not directed at children under the age of 13. We do
            not knowingly collect personal information from children. If you
            believe a child has provided us with personal data, please contact
            us and we will take steps to delete such information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated &quot;Last updated&quot; date.
            We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:contact@easyjwt.top"
              className="text-indigo-600 hover:underline font-medium"
            >
              contact@easyjwt.top
            </a>
            .
          </p>
        </section>

        <div className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-sm text-gray-500">
            <Link href="/" className="text-indigo-600 hover:underline">
              ← Back to JWT Decoder
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}
