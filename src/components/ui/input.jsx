export default function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-maintext placeholder:text-secondarytext font-semibold border border-border p-2 w-full rounded outline-none"
    />
  );
}
