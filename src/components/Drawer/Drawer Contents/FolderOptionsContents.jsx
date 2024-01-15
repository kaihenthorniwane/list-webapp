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
    <div className="flex flex-col gap-7 mt-6">
      <div className="flex flex-col items-center gap-5">
        <svg
          width="127"
          height="83"
          viewBox="0 0 127 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.03946 11.1642C5.96089 6.37954 5.92161 3.98722 7.3909 2.49361C8.86018 1 11.2528 1 16.0381 1H43.8712C46.8599 1 48.3542 1 49.6856 1.5767C51.017 2.1534 52.0392 3.24345 54.0835 5.42354L56.4543 7.95167C58.4986 10.1318 59.5208 11.2218 60.8522 11.7985C62.1835 12.3752 63.6779 12.3752 66.6666 12.3752H110.483C115.197 12.3752 117.554 12.3752 119.019 13.8397C120.483 15.3041 120.483 17.6612 120.483 22.3752V45.7646C120.483 61.6321 120.483 69.5658 115.554 74.4952C110.624 79.4246 102.691 79.4246 86.8232 79.4246H40.2721C24.6412 79.4246 16.8258 79.4246 11.9137 74.5925C7.00163 69.7604 6.87331 61.946 6.61668 46.3172L6.03946 11.1642Z"
            fill="rgb(var(--Brand-White))"
            stroke="rgb(var(--Brand-Black))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.51209 34.1016C1.14345 30.9755 0.959124 29.4125 1.85414 28.4057C2.74916 27.3989 4.32304 27.3989 7.4708 27.3989H119.608C122.722 27.3989 124.28 27.3989 125.174 28.3927C126.067 29.3864 125.903 30.935 125.574 34.0322L121.812 69.4774C121.18 75.4316 120.865 78.4087 118.868 80.2043C116.872 81.9999 113.878 81.9999 107.891 81.9999H19.6065C13.6834 81.9999 10.7219 81.9999 8.73263 80.2315C6.7434 78.463 6.39656 75.5218 5.70288 69.6395L1.51209 34.1016Z"
            fill="rgb(var(--Brand-White))"
            stroke="rgb(var(--Brand-Black))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex flex-col gap-1.5 items-center">
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
          text="Cancel"
          functionToRun={() => {
            setIsOn(!isOn);
          }}
        />
      </div>
    </div>
  );
}
