import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/Drawer Contents/NoteOptionsContents";
import { useOverlay } from "@/contexts/OverlayContext";

export default function MoreOptionsDots({ note_id }) {
  const { isOn, setIsOn, setOverlay } = useOverlay();

  return (
    <div className="opacity-button-transition">
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          setOverlay(
            <Drawer isOn={isOn} setIsOn={setIsOn}>
              <NoteOptionsContents setIsOn={setIsOn} />
            </Drawer>
          );
          setIsOn(!isOn);
        }}
      >
        <circle cx="5.90002" cy="13.5" r="1.90002" fill="#111A49" />
        <circle cx="13.5001" cy="13.5" r="1.90002" fill="#111A49" />
        <circle cx="21.1002" cy="13.5" r="1.90002" fill="#111A49" />
      </svg>
    </div>
  );
}
