import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const FolderTitle = ({ crumbNameAndLinkArray, headerText }) => {
  return (
    <div className="flex flex-col gap-3 no-drag-mobile w-full ">
      {crumbNameAndLinkArray ? (
        <Breadcrumbs crumbNameAndLinkArray={crumbNameAndLinkArray} />
      ) : (
        <div className="text-16 opacity-0" style={{ userSelect: "none" }}>
          empty
        </div>
      )}
      <h1 className="font-header text-38 font-400 leading-none">
        {headerText}
      </h1>
    </div>
  );
};

export default FolderTitle;
