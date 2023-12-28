"use client";

import FolderTitle from "@/components/Navigation/FolderTitle";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/Navigation/LoadingScreen";
import SmoothButton from "@/components/Drawer/Smooth Button/SmoothButton";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/Drawer Contents/NoteOptionsContents";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
// import SignOutButton from "@/components/SignOutButton";

export default function Folders() {
  const { data: session, status } = useSession();
  const { isOn, setIsOn, overlay, setOverlay } = useOverlay();

  useEffect(() => {
    console.log("###########################");
    console.log("###########################");
    console.log("Test page here. I see isOn as: " + isOn);
  }, [isOn]);

  if (status !== "loading") {
    // If there's a session, render the folder titles
    return (
      <>
        {overlay}
        <div className="px-5 py-5 flex flex-col items-center overflow-hidden">
          <div className="w-full max-w-4xl flex flex-col gap-8">
            <FolderTitle
              headerText={"Test Page"}
              crumbNameAndLinkArray={undefined}
            />
            <SmoothButton
              text="Test Button"
              functionToRun={() => {
                setIsOn(!isOn);
                setOverlay(
                  <Drawer isOn={isOn} setIsOn={setIsOn}>
                    <div className="flex flex-col gap-3">
                      <NoteCard
                        note_title={"Sample note"}
                        note_id="1"
                        note_content={
                          "This is just sample content to test the note"
                        }
                        variant={"simple"}
                        last_saved={new Date()}
                      />
                      <span className="font-heading text-32">
                        Share this note
                      </span>
                      <div className="flex gap-4 text-Brand-White text-center">
                        <div className="flex-shrink-0 w-24 h-24 bg-Brand-Black flex justify-center rounded-2xl items-center">
                          Copy Text
                        </div>

                        <div className="flex-shrink-0 w-24 h-24 bg-Brand-Black flex justify-center rounded-2xl items-center">
                          Save Image
                        </div>

                        <div className="flex-shrink-0 w-24 h-24 bg-Brand-Black flex justify-center rounded-2xl items-center">
                          Facebook
                        </div>

                        <div className="flex-shrink-0 w-24 h-24 bg-Brand-Black flex justify-center rounded-2xl items-center">
                          Instagram
                        </div>
                        <div className="flex-shrink-0 w-24 h-24 bg-Brand-Black flex justify-center rounded-2xl items-center">
                          X.com
                        </div>
                      </div>
                    </div>
                  </Drawer>
                );
              }}
            />
          </div>
        </div>
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}
