import { notFound } from "next/navigation";

/**
 * Catch-all that hands unmatched locale paths to [locale]/not-found.jsx.
 *
 * Without this, a URL like /ar/does-not-exist matches no route, so Next falls
 * back to the *root* not-found — and this project has no root app/layout.js
 * (the layout lives at app/[locale]/layout.js), so the visitor got Next's bare
 * built-in "404: This page could not be found." with no navigation, no header
 * and no footer. Verified before adding this file.
 */
export default function CatchAllNotFound() {
  notFound();
}
