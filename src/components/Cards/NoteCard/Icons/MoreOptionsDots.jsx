import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/Drawer Contents/NoteOptionsContents";
import { useOverlay } from "@/contexts/OverlayContext";

export default function MoreOptionsDots({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
}) {
  const { isOn, setIsOn, setOverlay } = useOverlay();

  return (
    <div className="opacity-button-transition relative z-[10] cursor-pointer">
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={(event) => {
          event.stopPropagation();
          setOverlay(
            <Drawer>
              <NoteOptionsContents
                note_id={note_id}
                folder_id={folder_id}
                note_title={note_title}
                note_content={note_content}
                last_saved={last_saved}
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
