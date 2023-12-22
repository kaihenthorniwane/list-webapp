import React from "react";

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
      className="absolute left-0 top-0 bottom-0 right-0 z-[-1] no-drag"
    >
      {/* Corners */}
      <img
        src="/svg/FolderNote/FolderNoteCornerTopLeft.svg"
        alt="Top Left"
        style={{ gridArea: "1 / 1 / 2 / 2" }}
      />
      <img
        src="/svg/FolderNote/FolderNoteFoldSmall.svg"
        alt="Top Right"
        style={{ gridArea: "1 / 3 / 2 / 4" }}
      />
      <img
        src="/svg/FolderNote/FolderNoteCornerBottomLeft.svg"
        alt="Bottom Left"
        style={{ gridArea: "3 / 1 / 4 / 2" }}
      />
      <img
        src="/svg/FolderNote/FolderNoteCornerBottomRight.svg"
        alt="Bottom Right"
        style={{ gridArea: "3 / 3 / 4 / 4" }}
      />

      {/* Edges */}
      <img
        src="/svg/FolderNote/FolderNoteTop.svg"
        alt="Top Edge"
        style={{
          gridArea: "1 / 2 / 2 / 3",
          maxHeight: "25px",
          minHeight: "25px",
        }}
        className="w-full"
      />
      <img
        src="/svg/FolderNote/FolderNoteBottom.svg"
        alt="Bottom Edge"
        style={{
          gridArea: "3 / 2 / 4 / 3",
          maxHeight: "25px",
          minHeight: "25px",
        }}
        className="w-full"
      />
      <img
        src="/svg/FolderNote/FolderNoteLeft.svg"
        alt="Left Edge"
        style={{
          gridArea: "2 / 1 / 3 / 2",
          maxWidth: "25px",
          minHeight: "0px",
        }}
      />
      <img
        src="/svg/FolderNote/FolderNoteRight.svg"
        alt="Right Edge"
        style={{
          gridArea: "2 / 3 / 3 / 4",
          maxWidth: "25px",
          minHeight: "0px",
        }}
      />

      {/* Center */}
      <div
        style={{
          gridArea: "2 / 2 / 3 / 3",
          background:
            "url(/svg/FolderNote/FolderNoteMiddle.svg) center center / cover no-repeat",
        }}
      />
    </div>
  );
};

export default FolderNoteBackground;
