import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import EditNoteContents from "./EditNoteContents";

export default function NewNoteButton({ folder_id }) {
  const { isOn, setIsOn, setOverlay } = useOverlay();
  return (
    <div
      className="fixed z-[90] bottom-5 right-5 brand-button-transition opacity-button-transition md:hidden"
      onClick={() => {
        setOverlay(
          <Drawer>
            <EditNoteContents folder_id={folder_id} variant={"new-note"} />
          </Drawer>
        );
        setIsOn(true);
      }}
    >
      <svg
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="58" height="58" rx="29" fill="rgb(var(--Brand-Black))" />
        <path
          d="M39 24.2393C39.0008 24.1077 38.9756 23.9772 38.9258 23.8554C38.876 23.7335 38.8027 23.6227 38.71 23.5293L34.47 19.2893C34.3766 19.1966 34.2658 19.1233 34.1439 19.0735C34.0221 19.0237 33.8916 18.9985 33.76 18.9993C33.6284 18.9985 33.4979 19.0237 33.3761 19.0735C33.2543 19.1233 33.1435 19.1966 33.05 19.2893L30.22 22.1193L19.29 33.0493C19.1973 33.1427 19.124 33.2535 19.0742 33.3754C19.0245 33.4972 18.9993 33.6277 19 33.7593V37.9993C19 38.2645 19.1054 38.5189 19.2929 38.7064C19.4804 38.8939 19.7348 38.9993 20 38.9993H24.24C24.3799 39.0069 24.5199 38.985 24.6508 38.9351C24.7818 38.8851 24.9007 38.8082 25 38.7093L35.87 27.7793L38.71 24.9993C38.8013 24.9024 38.8757 24.7908 38.93 24.6693C38.9397 24.5896 38.9397 24.509 38.93 24.4293C38.9347 24.3827 38.9347 24.3358 38.93 24.2893L39 24.2393ZM23.83 36.9993H21V34.1693L30.93 24.2393L33.76 27.0693L23.83 36.9993ZM35.17 25.6593L32.34 22.8293L33.76 21.4193L36.58 24.2393L35.17 25.6593Z"
          fill="rgb(var(--Brand-White))"
        />
      </svg>
    </div>
  );
}
