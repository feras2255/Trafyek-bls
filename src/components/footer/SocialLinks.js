import { FaSnapchatGhost, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinks({ links }) {
  return (
    <div className="flex justify-center gap-x-4 mt-3">
      <a
        href={links.snapchat}
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <FaSnapchatGhost className="text-amber-300 size-4 md:size-5" />
      </a>

      <a
        href={links.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="text-SecondText px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <FaTiktok className="text-black size-4 md:size-5" />
      </a>

      <a
        href={links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-destructive px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <FaInstagram className="size-4 md:size-5" />
      </a>

      <a
        href={links.x_account}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black px-3 py-2 bg-background hover:bg-card rounded-lg transition-colors duration-500 ease-in-out"
      >
        <FaXTwitter className="size-4 md:size-5" />
      </a>
    </div>
  );
}
