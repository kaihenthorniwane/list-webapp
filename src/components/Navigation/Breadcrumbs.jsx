import React from "react";
import Link from "next/link";

const Breadcrumbs = ({ crumbNameAndLinkArray }) => {
  return (
    <div className="text-16 flex gap-0.5">
      {crumbNameAndLinkArray.map((nameAndLink, index) => (
        <React.Fragment key={index}>
          <Link href={nameAndLink.link} style={{ textDecoration: "underline" }}>
            {nameAndLink.name}
          </Link>
          {index != crumbNameAndLinkArray.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
