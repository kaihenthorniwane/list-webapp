import React, { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { getSession } from "next-auth/react";
import UserProfile from "../Drawer/Drawer Contents/Drawer Components/UserProfile";

export default function FolderTitle({ crumbNameAndLinkArray, headerText }) {
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
    <div className="flex flex-col gap-3 no-drag-mobile w-full ">
      {crumbNameAndLinkArray ? (
        <Breadcrumbs crumbNameAndLinkArray={crumbNameAndLinkArray} />
      ) : (
        <div className="text-16 opacity-0" style={{ userSelect: "none" }}>
          empty
        </div>
      )}
      <div className="flex justify-between items-end">
        <h1 className="font-header text-44 tracking-wide font-400 leading-none">
          {headerText}
        </h1>
        <UserProfile
          firstname={sessionInfo.firstname}
          name={sessionInfo.name}
          image={sessionInfo.image}
          email={sessionInfo.email}
        />
      </div>
    </div>
  );
}
