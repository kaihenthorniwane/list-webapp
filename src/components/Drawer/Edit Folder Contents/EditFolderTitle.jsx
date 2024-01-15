import { useState } from "react";
import { useOverlay } from "@/contexts/OverlayContext";
import SmoothButton from "../Smooth Button/SmoothButton";
import TextInput from "../Posting Contents/Posting Components/TextInput";
import Drawer from "../Drawer";
import SmoothButtonBlack from "../Smooth Button/SmoothButtonBlack";
import FolderOptionsContents from "../Drawer Contents/FolderOptionsContents";
import { useFolders } from "@/contexts/FolderContext";
import FolderIcon from "../Drawer Contents/Icons/FolderIcon";

export default function EditFolderTitle({
  folder_id,
  folder_name = "",
  variant = "new-folder",
}) {
  const { setIsOn, setOverlay } = useOverlay();
  const {
    addAFolderAndRefreshOnscreenFolders,
    editAFolderAndRefreshOnscreenFolders,
  } = useFolders();
  //text states

  const [name, setName] = useState(folder_name);

  const saveFunctionVariant = {
    "new-folder": () => {
      addAFolderAndRefreshOnscreenFolders(name);
      setIsOn(false);
    },
    "edit-folder": () => {
      editAFolderAndRefreshOnscreenFolders(folder_id, name);
      setIsOn(false);
    },
  };

  const actionButtonTextVariant = {
    "new-folder": "Create",
    "edit-folder": "Update",
  };

  const cancelFunctionVariant = {
    "new-folder": () => {
      setIsOn(false);
    },
    "edit-folder": () => {
      setOverlay(
        <Drawer>
          <FolderOptionsContents
            folder_id={folder_id}
            folder_name={folder_name}
          />
        </Drawer>
      );
    },
  };

  return (
    <div className="flex flex-col gap-8 mt-6">
      <div className="flex flex-col items-center gap-5">
        <FolderIcon />
        <div className="font-header text-32 leading-none">
          <TextInput
            text={name}
            setText={setName}
            placeholder={"Write folder name"}
            fullWidth={false}
            wideTracking={true}
            textCenter={true}
            autoFocus={true}
          />
        </div>
      </div>

      <div className="flex gap-2.5">
        <SmoothButton
          text="Cancel"
          functionToRun={cancelFunctionVariant[variant]}
        />

        {name.length > 0 ? (
          <SmoothButtonBlack
            text={actionButtonTextVariant[variant]}
            functionToRun={saveFunctionVariant[variant]}
          />
        ) : (
          <div className="opacity-25 w-full">
            <SmoothButtonBlack
              text={actionButtonTextVariant[variant]}
              disabled={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
