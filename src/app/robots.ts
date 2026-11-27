import type { MetadataRoute } from "next";

const siteOrigin = "https://onspec.eu";

const publicPaths = [
  "/",
  "/businesses",
  "/ai-web",
  "/services",
  "/about",
  "/contact",
  "/legal",
  "/privacy",
  "/terms",
  "/cookies",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
  "/llms-full.txt",
  "/manifest.webmanifest",
];

const privatePaths = [
  "/api",
  "/api/",
  "/api/*",
  "/admin",
  "/admin/",
  "/admin/*",
  "/internal",
  "/internal/",
  "/internal/*",
];

const crawlerUserAgents = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: crawlerUserAgents,
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "*",
        allow: publicPaths,
        disallow: privatePaths,
      },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
