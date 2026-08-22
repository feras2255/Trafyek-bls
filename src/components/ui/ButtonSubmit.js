"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

const STYLES = {
  primary:
    "bg-primary text-text hover:bg-primary/90 shadow-lg shadow-primary/20",
  outline:
    "border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300",
  warning:
    "bg-warning text-text hover:bg-worning/90 shadow-lg shadow-amber-200/50",
  secondary:
    "bg-secondary text-black hover:bg-secondary/90 shadow-lg shadow-secondary/20",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20",
  ghost: "text-slate-500 hover:bg-slate-100",
};

export default function ButtonSubmit({
  text,
  title,
  type = "button",
  // `color` مرادف قديم لـ `variant`
  variant,
  color,
  className = "",
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  ...props
}) {
  const style = STYLES[variant ?? color] || STYLES.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={title || text || "ارسال بيانات"}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-black text-sm md:text-base",
        "transition-all duration-300 active:scale-95 cursor-pointer",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100",
        style,
        className,
      )}
      {...props}
    >
      {loading && (
        <AiOutlineLoading3Quarters className="animate-spin size-4 text-inherit" />
      )}

      {!loading && Icon && <Icon className="size-5" />}

      <span className={loading ? "opacity-70" : ""}>
        {loading ? "جاري المعالجة..." : text}
      </span>
    </button>
  );
}
