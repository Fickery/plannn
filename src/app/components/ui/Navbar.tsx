"use client";
import Image from "next/image";
import { useState } from "react";

function Navbar() {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

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
      <p>FICKERY</p>
    </div>
  );
}

export default Navbar;
