import React from "react";
import FolderNoteBottom from "./FolderNoteBackgroundLayers/FolderNoteBottom";
import FolderNoteCornerBottomLeft from "./FolderNoteBackgroundLayers/FolderNoteCornerBottomLeft";
import FolderNoteCornerBottomRight from "./FolderNoteBackgroundLayers/FolderNoteCornerBottomRight";
import FolderNoteCornerTopLeft from "./FolderNoteBackgroundLayers/FolderNoteCornerTopLeft";
import FolderNoteFoldSmall from "./FolderNoteBackgroundLayers/FolderNoteFoldSmall";
import FolderNoteLeft from "./FolderNoteBackgroundLayers/FolderNoteLeft";
import FolderNoteRight from "./FolderNoteBackgroundLayers/FolderNoteRight";
import FolderNoteTop from "./FolderNoteBackgroundLayers/FolderNoteTop";

const FolderNoteBackground = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "25px auto 25px",
        gridTemplateRows: "25px auto 25px",
        alignItems: "stretch",
        justifyItems: "stretch",
        width: "100%", // or any specific width
        height: "100%", // or any specific height
      }}
      className="absolute left-0 top-0 bottom-0 right-0 z-[-1] no-drag bg-Brand-White rounded-3xl"
    >
      {/* Corners */}
      <FolderNoteCornerTopLeft />
      <FolderNoteFoldSmall />
      <FolderNoteCornerBottomLeft />
      <FolderNoteCornerBottomRight />

      {/* Edges */}
      <FolderNoteTop />
      <FolderNoteBottom />
      <FolderNoteLeft />
      <FolderNoteRight />

      {/* Center */}
      <div
        style={{
          gridArea: "2 / 2 / 3 / 3",
          backgroundColor: "rgb(var(--Brand-White))",
        }}
      />
    </div>
  );
};

export default FolderNoteBackground;
