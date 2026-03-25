import Link from "next/link";

export default function Button({
  title = "تواصل معنا",
  color = "primary",
  href,
}) {
  const colorClasses = {
    primary: "bg-primary text-text hover:bg-primary/90",
    secondary: "bg-secondary text-black hover:bg-secondary/90",
    accent: "bg-accent text-text hover:bg-accent/90",
  };

  const classes = `group relative inline-flex items-center justify-center font-bold px-8 py-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-hover hover:-translate-y-1 transition-all duration-300 ${colorClasses[color]} `;

  // link element

  return (
    <Link href={href} aria-label={title} className={classes}>
      {title}
    </Link>
  );
}
