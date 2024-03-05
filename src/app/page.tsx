"use client";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import NotesIndex from "./components/NotesIndex";
import { NextUIProvider } from "@nextui-org/react";
import { Sign } from "crypto";
import SignInPage from "../app/components/SignInPage";

export default function Home() {
  return (
    <SignInPage />
    // <NextUIProvider>
    //   <main>
    //     <Provider store={store}>
    //       <NotesIndex />
    //     </Provider>
    //   </main>
    // </NextUIProvider>
  );
}
