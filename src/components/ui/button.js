import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const COLOR_CLASSES = {
  primary: "bg-primary text-text hover:bg-primary/90 shadow-primary/20",
  secondary:
    "bg-secondary text-black hover:bg-secondary/90 shadow-secondary/20",
  accent: "bg-accent text-text hover:bg-accent/90 shadow-accent/20",
  fourth: "bg-fourth text-maintext hover:bg-fourth/90 shadow-fourth/20",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90 shadow-destructive/20",
};

const SIZE_CLASSES = {
  default: "w-full md:w-fit",
  full: "w-full",
  lg: "w-full md:w-fit text-lg",
};

/**
 * يُصيّر <button> عند تمرير onClick أو type، و<Link> فيما عدا ذلك.
 * الروابط الخارجية (http/mailto/tel/#) تستخدم <a> عادي بدلاً من رابط next-intl.
 */
export default function Button({
  title = "تواصل معنا",
  children,
  color = "primary",
  size = "default",
  href,
  type,
  onClick,
  disabled = false,
  className = "",
  ...props
}) {
  const classes = cn(
    "group relative flex items-center justify-center font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    SIZE_CLASSES[size] || SIZE_CLASSES.default,
    COLOR_CLASSES[color] || COLOR_CLASSES.primary,
    className,
  );

  const label = children ?? title;

  if (type || onClick || !href) {
    return (
      <button
        type={type || "button"}
        onClick={onClick}
        disabled={disabled}
        aria-label={title}
        className={cn(classes, "cursor-pointer")}
        {...props}
      >
        {label}
      </button>
    );
  }

  const isExternal = /^(https?:|mailto:|tel:|#)/.test(String(href));

  if (isExternal) {
    return (
      <a
        href={href}
        aria-label={title}
        className={classes}
        {...(String(href).startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={title} className={classes} {...props}>
      {label}
    </Link>
  );
}
