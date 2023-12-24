import React, { useState } from "react";
import TabBackground from "./TabBackground/TabBackground";

export default function FilterTab({ label, iconType, selected }) {
  const [currentIcon, setCurrentIcon] = useState(iconType || "default"); //server rendered state
  const iconSrc = {
    default: "/svg/Filter/Filter Icon.svg",
    Filter: "/svg/Filter/Filter Icon.svg",
    Writer: "/svg/Filter/Writer Icon.svg",
  };
  return (
    <div className="relative">
      <div className="relative z-[1] flex items-center gap-2">
        <img src={iconSrc[currentIcon]} />
        <div className="flex items-center leading-none">
          <span className="mt-0.5">{label}</span>
          <img src="/svg/Filter/Dropdown Icon.svg" />
        </div>
      </div>
      <TabBackground />
    </div>
  );
}
