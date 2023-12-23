import React from "react";

export default function ({ label, iconType }) {
  const iconSrc = {
    default: "/svg/Filter/Filter Icon.svg",
    Filter: "/svg/Filter/Filter Icon.svg",
    Writer: "/svg/Filter/Writer Icon.svg",
  };
  return (
    <div className="flex items-center gap-2 ">
      <img src={iconSrc[iconType]} />
      <div className="flex items-center leading-none">
        <span className="mt-0.5">{label}</span>
        <img src="/svg/Filter/Dropdown Icon.svg" />
      </div>
    </div>
  );
}
