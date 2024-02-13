"use client";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import NotesIndex from "./components/NotesIndex";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <main>
        <Provider store={store}>
          <NotesIndex />
        </Provider>
      </main>
    </NextUIProvider>
  );
}
