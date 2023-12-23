import React from "react";
import FilterTab from "./FilterTab";

export default function FilterBarMobile() {
  return (
    <div className="sticky box-border mt-1 mb-10 top-0 w-full flex justify-center z-10">
      <div className="w-full px-5 pt-4 max-w-4xl flex gap-4 bg-Brand-White">
        <FilterTab label={"Order"} iconType={"Filter"} />
        <FilterTab label={"Layout"} iconType={"Writer"} />
      </div>
    </div>
  );
}
