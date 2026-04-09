"use client";

import { useState } from "react";

interface AddAnotherButtonProps {
  onClick?: () => void;
}

export default function AddAnotherButton({ onClick }: AddAnotherButtonProps) {
  const [pulsed, setPulsed] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setPulsed(true);
      setTimeout(() => setPulsed(false), 600);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 mb-6 group"
      style={{
        opacity: pulsed ? 0.4 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <span className="w-[24px] h-[24px] rounded-full border-2 border-cypress-100 flex items-center justify-center text-cypress-100 text-[16px] font-medium leading-none">
        +
      </span>
      <span className="font-sans text-[14px] text-cypress-100 group-hover:underline">
        Add another beneficiary
      </span>
      <span className="font-sans text-[14px] text-gray-40">(optional)</span>
    </button>
  );
}
