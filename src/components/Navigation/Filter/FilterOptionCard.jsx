import React, { useState } from "react";

export default function FilterOptionCard({
  selected,
  optionTitle,
  optionText,
  iconComponent: IconComponent,
}) {
  const [isSelected, setIsSelected] = useState(selected || false);

  return (
    <div
      className={"w-full relative " + (isSelected ? "text-Brand-White" : "")}
    >
      <div className="flex flex-col gap-2 relative z-[2]">
        <div className="flex gap-1 items-center leading-none">
          {IconComponent && (
            <IconComponent
              fill={
                isSelected ? "rgb(var(--White))" : "rgb(var(--Brand-Black))"
              }
            />
          )}
          <span className="-mb-1">{optionTitle}</span>
        </div>
        <div className="text-14 leading-none">{optionText}</div>
      </div>
      {isSelected && (
        <div className="bg-Brand-Black absolute z-[1] rounded-xl -top-2.5 -bottom-2.5 -left-2.5 -right-2.5" />
      )}
    </div>
  );
}
