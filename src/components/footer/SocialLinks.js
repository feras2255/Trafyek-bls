import { X } from "lucide-react";
import Tiktok from "@/components/icons/Tiktok";

import SnapchatIcon from "@/components/icons/SnapchatIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function SocialLinks({ links }) {
  return (
    <div className="flex justify-center gap-x-4 mt-3">
      <a
        href={links.snapchat}
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <SnapchatIcon className="size-6 md:size-8" />
      </a>

      <a
        href={links.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <Tiktok className="size-6 md:size-8" />
      </a>

      <a
        href={links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <InstagramIcon className="size-6 md:size-8" />
      </a>

      <a
        href={links.x_account}
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <X className="size-6 md:size-8" />
      </a>
    </div>
  );
}
