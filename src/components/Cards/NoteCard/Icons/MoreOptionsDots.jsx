import { NoteOptionsDrawerContext } from "@/components/Templates/FolderPageMobile";
import { useContext } from "react";

export default function MoreOptionsDots({ note_id }) {
  const { noteOptionsDrawerOn, setNoteOptionsDrawerOn } = useContext(
    NoteOptionsDrawerContext
  );
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        setNoteOptionsDrawerOn(!noteOptionsDrawerOn);
      }}
    >
      <circle cx="5.90002" cy="13.5" r="1.90002" fill="#111A49" />
      <circle cx="13.5001" cy="13.5" r="1.90002" fill="#111A49" />
      <circle cx="21.1002" cy="13.5" r="1.90002" fill="#111A49" />
    </svg>
  );
}
