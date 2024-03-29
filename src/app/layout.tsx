import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/ui/Navbar";
import "./globals.css";
import localFont from "next/font/local";

const ppNeue = localFont({
  src: [
    {
      path: "../../public/font/PPNeueMachina-InktrapRegular.otf",
      weight: "400",
      style: "normal",
    },
    // {
    //   path: './Roboto-Italic.woff2',
    //   weight: '400',
    //   style: 'italic',
    // },
    // {
    //   path: './Roboto-Bold.woff2',
    //   weight: '700',
    //   style: 'normal',
    // },
    // {
    //   path: './Roboto-BoldItalic.woff2',
    //   weight: '700',
    //   style: 'italic',
    // },
  ],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ppNeue.className}>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
