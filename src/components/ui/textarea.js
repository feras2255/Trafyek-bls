import { cn } from "@/lib/utils";

export default function Textarea({
  name,
  value,
  onChange,
  placeholder,
  required,
  rquired,
  label,
  rows = 6,
  className = "",
  id,
  ...props
}) {
  const textareaId = id || name || placeholder;
  const isRequired = required ?? rquired ?? false;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={textareaId} className="text-maintext font-semibold">
        {label || placeholder}
      </label>

      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        required={isRequired}
        rows={rows}
        className="text-maintext placeholder:text-subtext border border-border p-2 w-full rounded outline-none focus:border-primary transition-colors"
        {...props}
      />
    </div>
  );
}
