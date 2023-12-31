import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import EditNoteContents from "./EditNoteContents";
import NewNoteDesktopBack from "./NewNoteDesktopBack";

export default function NewNoteDesktopButton({ folder_id, dropDownState }) {
  const { isOn, setIsOn, setOverlay } = useOverlay();
  dropDownState;
  return (
    <div
      className={
        "flex relative pr-5 pl-4 gap-2 items-center text-Brand-White brand-button-transition opacity-button-transition h-[38px] transition-transform ease-fast-easing transform " +
        (dropDownState !== "closed" && "-translate-y-2 lesser-transform")
      }
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
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 15.3857C0 15.5499 0.0615779 15.7038 0.184734 15.8167C0.297627 15.9296 0.461835 16.0014 0.615779 16.0014H4.09493C4.1873 16.0014 4.27967 16.0014 4.36177 15.9604C4.44387 15.9296 4.51572 15.8783 4.57729 15.8167L13.4958 6.84686L15.8255 4.55822C15.8768 4.49664 15.9282 4.4248 15.9589 4.35296C15.9897 4.29138 16 4.20927 16 4.08612C16 3.98349 15.9897 3.92191 15.9589 3.85007C15.9282 3.77823 15.8871 3.70639 15.8255 3.64481L12.3464 0.17592C12.2848 0.114342 12.2232 0.0732899 12.1411 0.042501C12.0693 0.011712 11.9872 -0.00881398 11.9051 0.001449C11.823 0.001449 11.7409 0.011712 11.669 0.042501C11.5972 0.0732899 11.5253 0.114342 11.4638 0.17592L0.174471 11.4652C0.112893 11.5268 0.0718409 11.5884 0.041052 11.6602C0.010263 11.7423 0 11.8244 0 11.9065V15.3857ZM10.6017 2.78272L11.7716 1.623C11.8538 1.5409 11.9872 1.5409 12.059 1.623L14.3784 3.94244C14.4606 4.02454 14.4606 4.1477 14.3784 4.2298L13.2187 5.39978C13.2187 5.39978 13.1264 5.46136 13.075 5.46136C13.0237 5.46136 12.9724 5.44083 12.9314 5.39978L10.6119 3.08035C10.6119 3.08035 10.5504 2.98798 10.5504 2.93666C10.5504 2.88535 10.5709 2.83403 10.6119 2.79298L10.6017 2.78272ZM1.23156 12.2452C1.23156 12.1939 1.25208 12.1426 1.29314 12.1015L9.44195 3.9527C9.52405 3.8706 9.65747 3.8706 9.72931 3.9527L12.0487 6.27214C12.0487 6.27214 12.1103 6.3645 12.1103 6.41582C12.1103 6.46713 12.0898 6.51845 12.0487 6.5595L3.89994 14.7083C3.89994 14.7083 3.80757 14.7699 3.75625 14.7699H1.43682C1.32393 14.7699 1.23156 14.6775 1.23156 14.5646V12.2452Z"
          fill="white"
        />
      </svg>

      <span className="mt-0.5">New Note</span>
      <NewNoteDesktopBack />
    </div>
  );
}
