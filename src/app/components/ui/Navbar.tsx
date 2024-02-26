"use client";
import Image from "next/image";
import { useState } from "react";

function Navbar() {
  const [title, setTitle] = useState("");

  const handleTitleChange = () => {
    setTitle("");
  };

  return (
    <div className="flex h-[5vh] w-full justify-between bg-white p-2 text-darkblue">
      <Image
        src="/PlannnLogo.svg"
        alt="Plannn Logo"
        width="0"
        height="0"
        className="h-auto w-fit"
        priority
      />
      <input
        className="flex justify-center"
        placeholder="Title"
        onChange={handleTitleChange}
        value={title}
      />
      <p>FICKERY</p>
    </div>
  );
}

export default Navbar;
