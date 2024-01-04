import SmoothButton from "../Smooth Button/SmoothButton";
import { useOverlay } from "@/contexts/OverlayContext";
import SmoothButtonRedOutline from "../Smooth Button/SmoothButtonRedOutline";
import { useSession, signIn, signOut } from "next-auth/react";
import LogOutIcon from "./Icons/LogOutIcon";

export default function AccountInfoContents() {
  const { setIsOn } = useOverlay();
  const {} = useSession();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2.5">
        <SmoothButtonRedOutline
          text="Log Out"
          functionToRun={() => {
            signOut();
          }}
          Icon={LogOutIcon}
        />
        <SmoothButton
          text="Close"
          functionToRun={() => {
            setIsOn(false);
          }}
        />
      </div>
    </div>
  );
}
