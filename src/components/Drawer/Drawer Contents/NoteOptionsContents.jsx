import SmoothButton from "../Smooth Button/SmoothButton";
import DrawerOption from "./Drawer Components/DrawerOption";

export default function NoteOptionsContents({ isOn, setIsOn }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <DrawerOption
          iconSrc="/svg/Drawers/NoteOptionDrawer/Share Icon.svg"
          text="Share Note"
        />
        <DrawerOption
          iconSrc="/svg/Drawers/NoteOptionDrawer/Move Note.svg"
          text="Move Note"
        />
        <DrawerOption
          iconSrc="/svg/Drawers/NoteOptionDrawer/Trash Icon.svg"
          text="Delete Note"
          color="rgb(var(--Brand-Red))"
        />
      </div>
      <SmoothButton
        text="Cancel"
        functionToRun={() => {
          setIsOn(isOn);
        }}
      />
    </div>
  );
}
