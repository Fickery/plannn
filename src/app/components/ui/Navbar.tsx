"use client";
import useUser from "@/app/auth/hook/useUser";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import supabaseBrowser from "../../../../lib/supabase/browser";
import { useRouter } from "next/navigation";

function Navbar() {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSignOut = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
  };

  const { isFetching, data } = useUser();

  if (isFetching) {
    return <></>;
  }

  if (!data?.id) {
    router.push("/auth");
    return null;
  }

  return (
    <>
      {data?.id ? (
        <div className="relative flex h-[5vh] w-full justify-between bg-white p-2 text-darkblue">
          <Image
            src="/PlannnLogo.svg"
            alt="Plannn Logo"
            width="0"
            height="0"
            className="h-auto w-fit"
            priority
          />

          <span className="flex items-center justify-center">
            <input
              className="relative flex flex-col items-center justify-center text-center text-sm font-semibold placeholder:font-normal focus:outline-none"
              type="text"
              placeholder="Title"
              onChange={handleTitleChange}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              value={title}
            />
          </span>
          <div className="flex items-center justify-center gap-2">
            {data?.id ? <p>{data?.name}</p> : <p>log in bro</p>}
            <div>
              {data?.id ? (
                <></>
              ) : (
                <Link href="/auth">
                  <button className="hover:bg-mainbuttons bg-darkblue px-3 py-2 text-xs text-white outline outline-1 hover:text-lightblue">
                    Sign In
                  </button>
                </Link>
              )}

              <button
                className="hover:bg-mainbuttons bg-darkblue px-3 py-2 text-xs text-white outline outline-1 hover:text-lightblue"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navbar;
