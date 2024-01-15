"use client";

import React, { useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

import { signIn } from "next-auth/react";
import GoogleLogo from "./Icons/GoogleLogo";

const SignInGoogle = function () {
  const { rive, RiveComponent } = useRive({
    src: "/riv/list_logo.riv",
    stateMachines: "Logo Animation",
    autoplay: true,
  });

  const darkmodeInput = useStateMachineInput(
    rive,
    "Logo Animation",
    "Darkmode"
  );

  useEffect(() => {
    // Function to update dark mode based on data-theme attribute
    const updateDarkMode = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (darkmodeInput) {
        darkmodeInput.value = theme === "dark";
      }
    };

    // Call once to set initial state
    updateDarkMode();

    // Set up an observer to watch for changes in data-theme attribute
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [darkmodeInput]);

  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center gap-5">
        <div className="w-full h-24">
          <RiveComponent />
        </div>
        <p className="font-body text-24 leading-tight">For the noteworthy.</p>
      </div>
      <div className="brand-button-transition">
        <button
          className="flex gap-3 bg-Brand-Black pb-5 pt-6 px-8 rounded-[1.5rem]"
          onClick={() => signIn("google")}
        >
          <GoogleLogo />
          <span className="text-Brand-White">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignInGoogle;
