"use client";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import NotesIndex from "./components/NotesIndex";

export default function Home() {
  return (
    <main>
      <Provider store={store}>
        <NotesIndex />
      </Provider>
    </main>
  );
}
