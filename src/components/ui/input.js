import { cn } from "@/lib/utils";

export default function Input({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required,
  // إبقاء الاسم القديم المكتوب بخطأ إملائي حتى لا تنكسر أي استدعاءات قديمة
  rquired,
  label,
  className = "",
  inputClassName = "",
  id,
  ...props
}) {
  const inputId = id || name || placeholder;
  const isRequired = required ?? rquired ?? false;

  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={inputId} className="text-maintext font-semibold">
        {label || placeholder}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        required={isRequired}
        className={cn(
          "text-maintext placeholder:text-subtext font-semibold border border-border p-2 mt-2 w-full rounded outline-none focus:border-primary transition-colors",
          inputClassName,
        )}
        {...props}
      />
    </div>
  );
}
