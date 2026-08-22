"use client";

import ButtonSubmit from "../ui/ButtonSubmit";

export default function PageHeader({ title, buttonText, onButtonClick }) {
  return (
    <div className="flex justify-between items-center mb-16">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
      {buttonText && (
        <ButtonSubmit text={buttonText} title={buttonText} onClick={onButtonClick} />
      )}
    </div>
  );
}
