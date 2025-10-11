import React from "react";

export default function Button({ title, color, type, onClick, size }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-${color} hover:bg-${color}/90 w-${size}  text-maintext px-6 py-2 rounded cursor-pointer transition duration-300`}
    >
      {title}
    </button>
  );
}
