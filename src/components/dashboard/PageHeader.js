"use client";

import { Button } from "../ui/button";

export default function PageHeader({ title, buttonText, onButtonClick }) {
  return (
    <div className="flex justify-between items-center mb-16">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
      {buttonText && (
        <Button className={"cursor-pointer"} onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
