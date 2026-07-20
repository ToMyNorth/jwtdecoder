import { MetadataRoute } from "next";
import { siteConfig, blogPosts } from "@/lib/siteConfig";
import { getAllFrameworkSlugs } from "@/data/frameworks";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${siteConfig.url}/frameworks`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const frameworkRoutes = getAllFrameworkSlugs().map((slug) => ({
    url: `${siteConfig.url}/frameworks/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...frameworkRoutes];
}
