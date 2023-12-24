import React, { useState } from "react";
import FilterTab from "./FilterTab";
import { motion } from "framer-motion";
import AllFilterOptions from "./AllFilterOptions";

export default function FilterBarMobile() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className="sticky box-border mt-1 mb-10 top-0 w-full flex flex-col items-center z-10">
      <div className="w-full px-5 pt-4 max-w-4xl flex gap-4 bg-Brand-White relative z-[1]">
        <FilterTab label={"Layout"} iconType={"Writer"} />
        <FilterTab label={"Order"} iconType={"Filter"} />
      </div>
      <AllFilterOptions />
      <div className="absolute top-full w-full h-10 bg-White-Gradient-Down"></div>
    </div>
  );
}
