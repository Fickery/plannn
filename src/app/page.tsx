"use client";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import NotesContainer from "./components/ui/NotesContainer";

export default function Home() {
  return (
    <main>
      <Provider store={store}>
        <NotesContainer />
      </Provider>
    </main>
  );
}
