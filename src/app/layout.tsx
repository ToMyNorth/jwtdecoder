import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: [siteConfig.twitterImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does a JWT decoder do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A JWT decoder takes a Base64Url-encoded JWT string and decodes it into its three components: the header, the payload (containing claims), and the signature. It formats the JSON for easy reading and displays additional information like expiration status and algorithm details.",
        },
      },
      {
        "@type": "Question",
        name: "Can this tool validate JWT signatures?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tool decodes and inspects JWTs but does not perform cryptographic signature verification. Signature verification requires the secret or public key, which should be done server-side in your application.",
        },
      },
      {
        "@type": "Question",
        name: "Is decoding a JWT safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Decoding a JWT simply reads the Base64Url-encoded content. The payload and header are not encrypted — they are only encoded. However, the signature ensures integrity, so never trust a token's claims without verifying its signature on your server.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this tool on my phone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our JWT decoder is fully responsive and works on all devices including phones, tablets, and desktop computers.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
    ],
  };

  const webAppSchema = {
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: siteConfig.author,
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [webAppSchema, faqSchema, breadcrumbSchema],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
