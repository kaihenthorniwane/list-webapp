import "./globals.css";

export const metadata = {
  title: "List React App",
  description: "React project by Kai Henthorn-Iwane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
