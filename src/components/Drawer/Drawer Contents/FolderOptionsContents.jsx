import SmoothButton from "../Smooth Button/SmoothButton";
import DrawerOption from "./Drawer Components/DrawerOption";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import Modal from "@/components/Modal/Modal";
import TrashNoteIcon from "./Icons/TrashNoteIcon";
import RenameFolderIcon from "./Icons/RenameFolderIcon";
import { useEffect, useState } from "react";
import EditFolderTitle from "../Edit Folder Contents/EditFolderTitle";
import DeleteFolderContents from "@/components/Modal/Modal Contents/DeleteFolderContents";
import FolderIcon from "./Icons/FolderIcon";

export default function FolderOptionsContents({ folder_id, folder_name }) {
  const { isOn, setIsOn, setOverlay } = useOverlay();
  const [noteCount, setNoteCount] = useState("");

  useEffect(() => {
    const fetchNoteCount = async () => {
      try {
        const response = await fetch(`/api/getfoldercount/${folder_id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNoteCount(data.count);
      } catch (error) {
        console.error("Error fetching note count:", error);
      }
    };

    fetchNoteCount();
  }, [folder_id]);

  return (
    <div className="flex flex-col gap-8 mt-6">
      <div className="flex flex-col items-center gap-5">
        <FolderIcon />
        <div className="flex flex-col gap-1 items-center">
          <span className="font-header text-32 leading-none tracking-wide">
            {folder_name}
          </span>
          <div className="flex gap-2 items-center">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.5L1 9.6C1 11.8402 1 12.9603 1.43597 13.816C1.81947 14.5686 2.43139 15.1805 3.18404 15.564C4.03969 16 5.15979 16 7.4 16H9.6C11.8402 16 12.9603 16 13.816 15.564C14.5686 15.1805 15.1805 14.5686 15.564 13.816C16 12.9603 16 11.8402 16 9.6V7.4C16 5.15979 16 4.03969 15.564 3.18404C15.1805 2.43139 14.5686 1.81947 13.816 1.43597C12.9603 1 11.8402 1 9.6 1L8.5 1M1 8.5L8.5 1M1 8.5L3.7 8.5C5.38016 8.5 6.22024 8.5 6.86197 8.17302C7.42646 7.8854 7.8854 7.42646 8.17302 6.86197C8.5 6.22024 8.5 5.38016 8.5 3.7L8.5 1"
                stroke="rgb(var(--Brand-Black))"
                strokeWidth="1.5"
              />
            </svg>
            <span className="mt-1">{noteCount} notes</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <DrawerOption
            icon={<RenameFolderIcon />}
            text="Rename Folder"
            functionToRun={() => {
              setOverlay(
                <Drawer>
                  <EditFolderTitle
                    folder_id={folder_id}
                    folder_name={folder_name}
                    variant={"edit-folder"}
                  />
                </Drawer>
              );
            }}
          />
          <DrawerOption
            icon={<TrashNoteIcon />}
            text="Delete Folder"
            color="rgb(var(--Brand-Red))"
            functionToRun={() => {
              setOverlay(
                <Modal>
                  <DeleteFolderContents
                    folder_id={folder_id}
                    folder_name={folder_name}
                  />
                </Modal>
              );
            }}
          />
        </div>
        <SmoothButton
          text="Close"
          functionToRun={() => {
            setIsOn(!isOn);
          }}
        />
      </div>
    </div>
  );
}
