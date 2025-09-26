import React from "react";

export default function Textarea({ name, value, onChange, placeholder }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows="6"
      className="text-maintext placeholder:text-secondarytext font-semibold border border-border p-2 w-full rounded outline-none"
    />
  );
}
