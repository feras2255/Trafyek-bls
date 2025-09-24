import { Instagram, Music2, Ghost, X } from "lucide-react";
import Tiktok from "../icons/Tiktok";
import InstagramIcon from "../icons/InstagramIcon";
import SnapchatIcon from "../icons/SnapchatIcon";

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-x-4 mt-3">
      <a
        href="https://t.snapchat.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <SnapchatIcon className="size-6 md:size-8" />
      </a>

      <a
        href="https://www.tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <Tiktok className="size-6 md:size-8" />
      </a>

      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <InstagramIcon className="size-6 md:size-8" />
      </a>

      <a
        href="https://x.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <X className="size-6 md:size-8" />
      </a>
    </div>
  );
}
