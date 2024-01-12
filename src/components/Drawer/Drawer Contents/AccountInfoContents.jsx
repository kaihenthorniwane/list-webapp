import SmoothButton from "../Smooth Button/SmoothButton";
import { useOverlay } from "@/contexts/OverlayContext";
import SmoothButtonRedOutline from "../Smooth Button/SmoothButtonRedOutline";
import { useSession, getSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import LogOutIcon from "./Icons/LogOutIcon";
import UserProfile from "./Drawer Components/UserProfile";

export default function AccountInfoContents() {
  const { setIsOn } = useOverlay();

  const [sessionInfo, setSessionInfo] = useState({
    firstname: "",
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        const fullName = session.user.name || ""; // Fallback to empty string if name is not available
        const firstName = fullName.split(" ")[0]; // Split the name by space and take the first part
        setSessionInfo({
          firstname: firstName,
          name: fullName,
          email: session.user.email || "", // Fallback to empty string if email is not available
          image: session.user.image || "", // Fallback to empty string if image is not available
        });
      } else {
        console.log("No session found");
      }
    };
    fetchSession();
  }, []);

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col items-center gap-3">
        <UserProfile image={sessionInfo.image} variant={"big"} />
        <div className="flex flex-col items-center gap-2">
          <span className="font-header text-32 leading-none tracking-wide">
            {sessionInfo.name}
          </span>
          <div className="flex gap-2 items-center">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.00007C1 5.38891 1 4.08333 1.66186 3.16619C1.88119 2.86227 2.14791 2.59555 2.45184 2.37622C3.36898 1.71436 4.67456 1.71436 7.28572 1.71436H10.7143C13.3254 1.71436 14.631 1.71436 15.5482 2.37622C15.8521 2.59555 16.1188 2.86227 16.3381 3.16619C17 4.08333 17 5.38891 17 8.00007C17 10.6112 17 11.9168 16.3381 12.8339C16.1188 13.1379 15.8521 13.4046 15.5482 13.6239C14.631 14.2858 13.3254 14.2858 10.7143 14.2858H7.28572C4.67456 14.2858 3.36898 14.2858 2.45184 13.6239C2.14791 13.4046 1.88119 13.1379 1.66186 12.8339C1 11.9168 1 10.6112 1 8.00007Z"
                stroke="rgb(var(--Brand-Black))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 4L7.2 8.65C8.06667 9.3 8.5 9.625 9 9.625C9.5 9.625 9.93333 9.3 10.8 8.65L17 4"
                stroke="rgb(var(--Brand-Black))"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mt-0.5 leading-none">{sessionInfo.email}</span>
          </div>
        </div>
      </div>
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
