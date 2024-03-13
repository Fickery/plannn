"use client";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import NotesIndex from "./components/NotesIndex";
import { NextUIProvider } from "@nextui-org/react";
import useUser from "@/app/auth/hook/useUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isFetching, data } = useUser();
  const router = useRouter();

  // if (!data?.id) {
  //   router.push("/auth");
  //   return null;
  // }

  // if (data?.id) {
  //   router.push("/");
  //   return null;
  // }

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
