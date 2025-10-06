export default function Input({
  type,
  placeholder,
  name,
  value,
  onChange,
  rquired,
}) {
  return (
    <div>
      <label className="text-primary font-semibold">{placeholder}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-secondarytext placeholder:text-border font-semibold border border-border p-2 mt-2 w-full rounded outline-none"
        required={rquired}
      />
    </div>
  );
}
