import React from "react";

export default function Textarea({ value, onChange, placeholder }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows="6"
      className="text-maintext placeholder:text-secondarytext font-semibold border border-border p-2 w-full rounded outline-none"
    />
  );
}
