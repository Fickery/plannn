import React, { useState } from "react";
import "../../../../src/app/globals.css";
import useClickOutside from "@/hooks/useClickOutside";

function Menu({ handleDeleteSubNote }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div>
      <div
        ref={dropdownRef}
        className={`arrow-icon ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <p
          className={`w-fit rounded-md px-1 text-blue-600 duration-[25ms] hover:bg-slate-200 ${
            isOpen ? "bg-slate-200" : "bg-slate-100"
          }`}
          style={{ userSelect: "none" }}
        >
          ...
        </p>
      </div>
      <div
        className="absolute right-[-70px] top-[-5px] w-fit overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div
          className="cursor-pointer p-2 text-xs font-semibold text-red-700 hover:bg-red-200"
          onClick={handleDeleteSubNote}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default Menu;
