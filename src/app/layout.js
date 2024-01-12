import AuthContext from "@/components/AuthContext";
import { OverlayProvider } from "@/contexts/OverlayContext";
import NextThemeProvider from "@/contexts/NextThemeProvider";
import React from "react";
import "./globals.css";

export const metadata = {
  title: "List React App",
  description: "React project by Kai Henthorn-Iwane",
  metadataBase: new URL("https://list-webapp.vercel.app/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-18 bg-Brand-White">
        <AuthContext>
          <OverlayProvider>
            <NextThemeProvider>{children}</NextThemeProvider>
          </OverlayProvider>
        </AuthContext>
      </body>
    </html>
  );
}
