import React from "react";
import Rive from "@rive-app/react-canvas";

const LoadingScreen = function () {
  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center gap-10 text-center">
      <img width={150} height={150} src="/gif/Loading Animation.gif" />
    </div>
  );
};

export default LoadingScreen;
