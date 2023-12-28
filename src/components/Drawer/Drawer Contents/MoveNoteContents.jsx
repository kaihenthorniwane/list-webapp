"use client";

import React, { useEffect, useState } from "react";
import SmoothButton from "../Smooth Button/SmoothButton";
import { useOverlay } from "@/contexts/OverlayContext";
import { useSession } from "next-auth/react";
import Drawer from "../Drawer";
import NoteOptionsContents from "./NoteOptionsContents";
import { motion } from "framer-motion";
import SmoothButtonBlack from "../Smooth Button/SmoothButtonBlack";
import ChooseFolderOption from "./Drawer Components/ChooseFolderOption";

export default function MoveNoteContents({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
}) {
  const { setOverlay, setIsOn } = useOverlay();
  const [chosenFolder, setChosenFolder] = useState(null);

  const { data: session, status } = useSession();
  const [folders, setFolders] = useState([]);
  const [foldersFetched, setFoldersFetched] = useState(false);

  useEffect(() => {
    console.log("status changed to " + status);
    async function fetchFolders() {
      if (status === "authenticated" && !foldersFetched) {
        try {
          const response = await fetch("/api/getfolders/" + session.userId);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const folderData = await response.json();
          setFolders(folderData);
          setFoldersFetched(true);
        } catch (error) {
          console.error("Failed to fetch folders:", error.message);
        }
      }
    }

    fetchFolders();
  }, [status]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-32 font-header font-400">Move this note:</span>
        <div className="flex flex-col gap-3">
          {folders.map((folder) => {
            return (
              <ChooseFolderOption
                key={folder.folder_id}
                text={folder.folder_name}
                folder_id={folder.folder_id}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
              />
            );
          })}
        </div>
      </div>
      <div className="flex gap-2.5">
        <SmoothButton
          text="Cancel"
          functionToRun={() => {
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
          }}
        />
        {chosenFolder ? (
          <SmoothButtonBlack
            text="Move"
            functionToRun={() => {
              setIsOn(false);
            }}
          />
        ) : (
          <div className="opacity-25 w-full">
            <SmoothButtonBlack text="Move" />
          </div>
        )}
      </div>
    </div>
  );
}
