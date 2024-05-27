"use client";
import { NextUIProvider } from "@nextui-org/react";
import NotePage from "./notes/[notesId]/page";

export default function Home() {
  return (
    <NextUIProvider>
      <main>
        <NotePage />
      </main>
    </NextUIProvider>
  );
}
