export default function Textarea({ name, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-maintext font-semibold">{placeholder}</label>

      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows="6"
        className="text-maintext placeholder:text-subtext border border-border p-2 w-full rounded outline-none"
      />
    </div>
  );
}
