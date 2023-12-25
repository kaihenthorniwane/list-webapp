import React, { useState, useContext } from "react";
import FilterTab from "./FilterTab";
import AllFilterOptions from "./AllFilterOptions";
import { NoteFormatContext } from "@/components/Templates/FolderPageMobile";

export const DropDownStateContext = React.createContext();

export default function FilterBarMobile() {
  const [dropDownState, setDropDownState] = useState("closed");
  const { noteFormat, setNoteFormat } = useContext(NoteFormatContext);

  return (
    <DropDownStateContext.Provider value={{ dropDownState, setDropDownState }}>
      <div className="sticky box-border mt-1 mb-10 top-0 w-full flex flex-col items-center z-10">
        <div className="no-drag w-full px-5 pt-4 max-w-4xl flex gap-4 bg-Brand-White relative z-[1]">
          <FilterTab label={"Layout"} iconType={noteFormat} />
          <FilterTab label={"Order"} iconType={"Filter"} />
        </div>
        <AllFilterOptions />
        <div className="absolute top-full w-full h-10 bg-White-Gradient-Down"></div>
      </div>
    </DropDownStateContext.Provider>
  );
}
