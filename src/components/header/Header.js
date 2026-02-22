import { siteSettings } from "@/lib/siteSettings";
import Navbar from "./Navbar";

export default async function Header() {
  const settings = await siteSettings();

  if (!settings) return null;
  return (
    <header
      className={`fixed left-0 right-0 py-2 md:py-1 z-40  shadow top-0 bg-background`}
    >
      <div className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-between">
        <Navbar settings={settings} />
      </div>
    </header>
  );
}
