"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import NotesIndex from "./components/NotesIndex";
import Navbar from "./components/ui/Navbar";

export default function Home() {
  return (
    <NextUIProvider>
      <main>
        <Provider store={store}>
          <div className="flex w-full justify-around">
            <Navbar />
          </div>
          <NotesIndex />
        </Provider>
      </main>
    </NextUIProvider>
  );
}
