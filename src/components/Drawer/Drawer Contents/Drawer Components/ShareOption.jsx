import React from "react";

export default function ShareOption({
  text,
  IconComponent, // Using a component instead of iconSrc
  functionToRun = () => {},
}) {
  return (
    <div
      className="flex flex-col gap-1.5 items-center text-center tracking-tight flex-shrink-0 brand-button-transition opacity-button-transition"
      onClick={functionToRun}
    >
      <IconComponent width={70} height={70} />
      {/* Render the passed component */}
      <span>{text}</span>
    </div>
  );
}
