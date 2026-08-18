import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Content Security Policy — REPORT ONLY for now.
 *
 * The audit found no security headers at all, so nothing limited the blast
 * radius of an XSS. This policy is deliberately shipped as
 * Content-Security-Policy-Report-Only first: it logs violations to the browser
 * console without blocking anything, so you can confirm GTM, Google Fonts, the
 * Maps embed and Supabase all still work before it starts enforcing.
 *
 * TO ENFORCE: rename the header below to "Content-Security-Policy". Do that
 * only after checking the console on the home page, a service page, the contact
 * page (map embed) and the dashboard (image uploads).
 *
 * 'unsafe-inline' on script-src is required by Google Tag Manager and by
 * Next.js's inline bootstrap; removing it needs a nonce pipeline, which is a
 * larger change than this batch.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://*.supabase.co https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
  // The contact page embeds a Google Maps iframe.
  "frame-src 'self' https://www.google.com https://maps.google.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Stops the site being framed by another origin (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stops browsers guessing a different content type than declared.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Sends the origin, not the full URL, on cross-origin navigations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No feature of these is used; deny by default.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Two years, subdomains included. Safe here: the site is HTTPS-only.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vssbbduscdjqisjnrwhb.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  /**
   * Domain consolidation and legacy URLs.
   *
   * The audit found search results still serving URLs from a previous version
   * of this site:
   *   https://trafyekbls.com/en/p/rayAd   → "قيمنا ترافيك بلس للتسويق"
   *   https://trafyekbls.com/en/p/lrXGr   → "من نحن"
   *
   * Two separate problems in those lines. First, no `/p/<id>` route exists in
   * this codebase — `find src/app -ipath "*​/p/*"` returns nothing — so both
   * URLs 404 today and whatever authority they earned is being discarded.
   * Second, they sit on the bare apex domain while lib/seo.js and robots.js
   * both declare https://www.trafyekbls.com, so Google is holding two hosts
   * for one site and splitting the signals between them.
   *
   * There were no redirects at all in this project before this block.
   */
  async redirects() {
    return [
      // Apex → www. The `has` host match is exact, so a request that already
      // arrives on www does not match and cannot loop. Preview deployments on
      // *.vercel.app do not match either, which is intended.
      {
        source: "/:path*",
        has: [{ type: "host", value: "trafyekbls.com" }],
        destination: "https://www.trafyekbls.com/:path*",
        permanent: true,
      },

      // The two legacy URLs we can actually identify. Both were company-story
      // pages, so /about-us is their genuine equivalent.
      {
        source: "/:locale(ar|en)/p/rayAd",
        destination: "/:locale/about-us",
        permanent: true,
      },
      {
        source: "/:locale(ar|en)/p/lrXGr",
        destination: "/:locale/about-us",
        permanent: true,
      },

      // NOTE — deliberately no catch-all `/p/:id` rule.
      //
      // Only two legacy ids are known, from search results. Sending every
      // other `/p/*` to the home page would be a mass redirect to an unrelated
      // destination, which Google treats as a soft 404 — so it would not
      // preserve the authority it appears to preserve, and it would hide the
      // real inventory of dead URLs. Letting the unknown ones 404 is the
      // honest signal.
      //
      // TO COMPLETE THIS: once Search Console is connected for the domain,
      // open Indexing → Pages → "Not found (404)" to get the full list of
      // legacy URLs, then add one mapped rule per URL here. That list cannot
      // be obtained any other way, which is why this is left open rather than
      // guessed.
    ];
  },
};

export default withNextIntl(nextConfig);
