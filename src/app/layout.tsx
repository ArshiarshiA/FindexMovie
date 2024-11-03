import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "FINDEX",
  description: "FAST MOVIE DB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
