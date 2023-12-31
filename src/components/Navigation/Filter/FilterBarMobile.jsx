import React, { useState, useContext } from "react";
import FilterTab from "./FilterTab";
import AllFilterOptions from "./AllFilterOptions";
import { AppSetNoteFormatContext } from "@/components/Templates/FolderPageMobile";
import NewNoteDesktopButton from "@/components/Drawer/Posting Contents/NewNoteDesktopButton";

export const DropDownStateContext = React.createContext();

export default function FilterBarMobile({ folder_id }) {
  const [dropDownState, setDropDownState] = useState("closed");
  const { appSetNoteFormat, setAppSetNoteFormat } = useContext(
    AppSetNoteFormatContext
  );

  return (
    <DropDownStateContext.Provider value={{ dropDownState, setDropDownState }}>
      <div className="sticky box-border mt-1 mb-10 top-0 w-full flex flex-col items-center z-[11]">
        <div className="items-center no-drag w-full mx-5 pt-4 max-w-3xl bg-Brand-White relative z-[1] flex md:justify-between">
          <div className=" flex gap-3 ">
            <FilterTab label={"Order"} iconType={"Filter"} />
            <FilterTab label={"Layout"} iconType={appSetNoteFormat} />
          </div>

          <div className="max-h-3 items-center hidden md:flex">
            <NewNoteDesktopButton
              folder_id={folder_id}
              dropDownState={dropDownState}
            />
          </div>
        </div>
        <AllFilterOptions />
        <div className="absolute top-full w-full h-10 bg-White-Gradient-Down"></div>
      </div>
    </DropDownStateContext.Provider>
  );
}
