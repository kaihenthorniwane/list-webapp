import AuthContext from "@/components/AuthContext";
import React from "react";
import "./globals.css";

export const metadata = {
  title: "List React App",
  description: "React project by Kai Henthorn-Iwane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-18">
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
