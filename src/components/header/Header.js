import { siteSettings } from "@/lib/siteSettings";
import Navbar from "./Navbar";

export default async function Header() {
  const settings = await siteSettings();

  // The header carries the site's only navigation, so a failed settings read
  // must not remove it. Navbar falls back to the design's brand mark and
  // points its CTA at /contact when no settings row is available.
  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-border bg-background/90 backdrop-blur-[10px]">
      <div className="container mx-auto flex items-center justify-between px-6 py-3.5">
        <Navbar settings={settings} />
      </div>
    </header>
  );
}
