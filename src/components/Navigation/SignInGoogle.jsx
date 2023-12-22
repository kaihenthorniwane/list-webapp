"use client";

import React from "react";
import Rive from "@rive-app/react-canvas";
import { useSession, signIn, signOut } from "next-auth/react";

const SignInGoogle = function () {
  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center gap-5">
        <div className="w-full h-24">
          <Rive
            src="/riv/list_logo.riv"
            stateMachines="Logo Animation"
            autoPlay={true}
          />
        </div>
        <p className="font-body text-24 leading-tight">For the noteworthy.</p>
      </div>
      <div className="brand-button-transition">
        <button
          className="flex gap-3 bg-Brand-Black pb-5 pt-6 px-8 rounded-[1.5rem]"
          onClick={() => signIn("google")}
        >
          <img src="/svg/google-icon.svg" style={{ width: "1.4rem" }}></img>
          <span className="text-Brand-White">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignInGoogle;
