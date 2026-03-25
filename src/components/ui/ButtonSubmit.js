"use client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ButtonSubmit({
  text,
  type = "button",
  variant = "primary",
  className = "",
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  ...props
}) {
  // Variant
  const variants = {
    primary:
      "bg-primary text-text hover:bg-primary/90 shadow-lg shadow-primary/20",
    outline:
      "border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300",
    warning:
      "bg-warning text-text hover:bg-worning/90 shadow-lg shadow-amber-200/50",
    ghost: "text-slate-500 hover:bg-slate-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative inline-flex items-center justify-center gap-2 
        px-6 py-3 rounded-lg font-black text-sm md:text-base
        transition-all duration-300 active:scale-95
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer
        ${variants[variant]} 
        ${className}
      `}
      {...props}
    >
      {/* حالة التحميل (Spinner) */}
      {loading && (
        <AiOutlineLoading3Quarters className="animate-spin size-4 text-inherit" />
      )}

      {/* الأيقونة (إذا وجدت ولم نكن في حالة تحميل) */}
      {!loading && Icon && <Icon className="size-5" />}

      {/* النص */}
      <span className={loading ? "opacity-70" : ""}>
        {loading ? "جاري المعالجة..." : text}
      </span>
    </button>
  );
}
