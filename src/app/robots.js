export default function robots() {
  const baseUrl = "https://www.trafyekbls.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/login", "/ar/dashboard", "/ar/login", "/en/dashboard", "/en/login"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
