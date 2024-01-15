import Drawer from "@/components/Drawer/Drawer";
import FolderOptionsContents from "@/components/Drawer/Drawer Contents/FolderOptionsContents";
import { useOverlay } from "@/contexts/OverlayContext";

export default function MoreOptionsDotsFolder({ folder_id, folder_name }) {
  const { isOn, setIsOn, setOverlay } = useOverlay();

  return (
    <div className="opacity-button-transition absolute right-5 bottom-5 z-[10] cursor-pointer">
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={(event) => {
          event.stopPropagation();
          event.nativeEvent.preventDefault();
          setOverlay(
            <Drawer>
              <FolderOptionsContents
                folder_id={folder_id}
                folder_name={folder_name}
              />
            </Drawer>
          );
          setIsOn(!isOn);
        }}
      >
        <circle
          cx="5.90002"
          cy="13.5"
          r="1.90002"
          fill="rgb(var(--Brand-Black))"
        />
        <circle
          cx="13.5001"
          cy="13.5"
          r="1.90002"
          fill="rgb(var(--Brand-Black))"
        />
        <circle
          cx="21.1002"
          cy="13.5"
          r="1.90002"
          fill="rgb(var(--Brand-Black))"
        />
      </svg>
    </div>
  );
}
