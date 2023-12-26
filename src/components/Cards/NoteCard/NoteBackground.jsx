import React from "react";
import NoteBottom from "./NoteBackgroundLayers/NoteBottom";
import NoteCornerBottomLeft from "./NoteBackgroundLayers/NoteCornerBottomLeft";
import NoteCornerBottomRight from "./NoteBackgroundLayers/NoteCornerBottomRight";
import NoteCornerTopLeft from "./NoteBackgroundLayers/NoteCornerTopLeft";
import NoteFold from "./NoteBackgroundLayers/NoteFold";
import NoteLeft from "./NoteBackgroundLayers/NoteLeft";
import NoteRight from "./NoteBackgroundLayers/NoteRight";
import NoteTop from "./NoteBackgroundLayers/NoteTop";

const NoteBackground = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px auto 48px",
        gridTemplateRows: "48px auto 48px",
        alignItems: "stretch",
        justifyItems: "stretch",
        width: "100%", // or any specific width
        height: "100%", // or any specific height
      }}
      className="absolute left-0 top-0 bottom-0 right-0 z-[-1] no-drag"
    >
      {/* Corners */}
      <NoteCornerTopLeft />
      <NoteFold />
      <NoteCornerBottomLeft />
      <NoteCornerBottomRight />

      {/* Edges */}
      <NoteTop />
      <NoteBottom />
      <NoteLeft />
      <NoteRight />

      {/* Center */}
      <div
        style={{
          gridArea: "2 / 2 / 3 / 3",
          backgroundColor: "rgb(var(--White))",
        }}
      />
    </div>
  );
};

export default NoteBackground;
