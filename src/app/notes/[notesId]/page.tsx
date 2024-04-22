"use client";
import { Provider, useSelector } from "react-redux"; // Importing Provider and useSelector from react-redux
import { useParams } from "next/navigation";
import React from "react";
import store from "@/redux/store/store"; // Importing your Redux store
import NotesIndex from "@/app/components/NotesIndex";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loading from "@/app/loading";

let persistor = persistStore(store);

const NotePage = () => {
  // const { noteId } = useParams();
  // const sessions = useSelector((state: RootState) => state.sessions.sessions);
  // const currentSessionId = useSelector(
  //   (state: RootState) => state.sessions.currentSessionId,
  // );

  // const session = sessions.find((session) => session.id === noteId);

  // const sessionName = sessions.find(
  //   (session) => session.id === currentSessionId,
  // )?.name;

  return (
    <div>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <NotesIndex />
      </PersistGate>
    </div>
  );
};

const NotePageWithProvider = () => (
  <Provider store={store}>
    <NotePage />
  </Provider>
);

export default NotePageWithProvider;
