// "use client";
import Link from "next/link";

export default function Button({
  title,
  color = "primary",
  type = "button",
  onClick,
  size = "md",
  ariaLabel,
  href,
}) {
  const accessibleLabel = title || ariaLabel || "زر";

  const colorClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-black hover:bg-secondary/90",
    fourth: "bg-fourth text-maintext hover:bg-fourth/90",
    Link: "bg-transparent text-fourth underline",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-2 text-lg",
    full: "w-full px-6 py-2 text-base",
  };

  const classes = `rounded cursor-pointer transition duration-300 ${colorClasses[color]} ${sizeClasses[size]}`;

  // link element
  if (href) {
    return (
      <Link href={href} aria-label={accessibleLabel} className={classes}>
        {title}
      </Link>
    );
  }

  // button element
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={accessibleLabel}
      className={classes}
    >
      {title}
    </button>
  );
}
