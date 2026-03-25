import Link from "next/link";

export default function Button({
  title = "تواصل معنا",
  color = "primary",
  href = "#",
  className = "",
}) {
  const colorClasses = {
    primary: "bg-primary text-text hover:bg-primary/90 shadow-primary/20",
    secondary:
      "bg-secondary text-black hover:bg-secondary/90 shadow-secondary/20",
    accent: "bg-accent text-text hover:bg-accent/90 shadow-accent/20",
  };

  const baseClasses =
    "group relative flex items-center justify-center font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95";
  const responsiveClasses = "w-full md:w-fit";

  const finalClasses = `${baseClasses} ${responsiveClasses} ${colorClasses[color] || colorClasses.primary} ${className}`;

  // link element
  return (
    <Link href={href} aria-label={title} className={finalClasses}>
      {title}
    </Link>
  );
}
