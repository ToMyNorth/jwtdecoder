import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About JWT Decoder Pro - Free Online JWT Token Inspector",
  description:
    "Learn about JWT Decoder Pro, a free online JWT decoder and parser tool. Decode, inspect, and validate JSON Web Tokens securely in your browser.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        About {siteConfig.name}
      </h1>
      <div className="mt-6 prose max-w-none">
        <p>
          {siteConfig.name} is a free, fast, and privacy-focused online JWT
          decoder and parser tool. Our mission is to provide developers,
          security professionals, and API engineers with a simple yet powerful
          tool to inspect and decode JSON Web Tokens in real-time.
        </p>

        <h2>Why We Built This Tool</h2>
        <p>
          We noticed that many online JWT decoders were either slow, cluttered
          with ads, or required sending tokens to a server — which raises
          serious security concerns. We wanted to create a tool that is:
        </p>
        <ul>
          <li>
            <strong>Fast:</strong> Decoding happens instantly as you paste
          </li>
          <li>
            <strong>Private:</strong> Your token never leaves your browser
          </li>
          <li>
            <strong>Free:</strong> No cost, no sign-up, no limitations
          </li>
          <li>
            <strong>Comprehensive:</strong> Header, payload, signature, claims,
            and expiration status
          </li>
          <li>
            <strong>Mobile-friendly:</strong> Works perfectly on all devices
          </li>
        </ul>

        <h2>Features</h2>
        <p>
          Our JWT decoder tool provides a comprehensive set of features for
          inspecting JSON Web Tokens:
        </p>
        <ul>
          <li>Real-time JWT decoding as you type or paste</li>
          <li>Formatted header and payload with syntax highlighting</li>
          <li>Raw signature display in Base64Url format</li>
          <li>Expiration status indicator (active vs. expired)</li>
          <li>Algorithm details and type information</li>
          <li>Key claims overview (iss, sub, aud, exp, iat, nbf, jti)</li>
          <li>Custom claims display</li>
          <li>Human-readable date formatting for time-based claims</li>
          <li>One-click sample token loading</li>
          <li>Copy and clear functionality</li>
        </ul>

        <h2>Privacy &amp; Security</h2>
        <p>
          Your privacy is our top priority. Our JWT decoder tool runs entirely
          in your browser. Your token is never sent to any server, stored, or
          shared with any third party. All decoding and parsing happens
          locally on your device. You can use our tool with complete confidence
          that your data is private and secure — even when inspecting sensitive
          production tokens.
        </p>

        <h2>Technology</h2>
        <p>
          This tool is built with Next.js, React, and Tailwind CSS, and is
          deployed on Vercel for optimal performance and reliability. The JWT
          decoding logic is implemented in pure JavaScript with zero
          third-party dependencies, ensuring transparency and security.
        </p>

        <h2>Get in Touch</h2>
        <p>
          Have questions, suggestions, or feedback? We&apos;d love to hear from
          you. Start using our{" "}
          <Link href="/">JWT decoder tool</Link> today, or check out our{" "}
          <Link href="/blog">blog</Link> for in-depth guides on JWT structure,
          security best practices, and authentication strategies.
        </p>
      </div>
    </div>
  );
}
