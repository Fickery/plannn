"use client";
import useUser from "@/app/auth/hook/useUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const { isFetching, data } = useUser();

  if (isFetching) {
    return <></>;
  }

  return (
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
      <p>{data?.name}</p>
      <Link href="/auth">
        <button className="bg-darkblue p-2 text-white outline outline-1 hover:bg-mainbuttons hover:text-lightblue">
          Sign In
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
