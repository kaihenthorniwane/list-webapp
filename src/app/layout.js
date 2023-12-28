import AuthContext from "@/components/AuthContext";
import { OverlayProvider } from "@/contexts/OverlayContext";
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
        <AuthContext>
          <OverlayProvider>{children}</OverlayProvider>
        </AuthContext>
      </body>
    </html>
  );
}
