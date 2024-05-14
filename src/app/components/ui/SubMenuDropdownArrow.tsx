import React, { useState } from "react";
import "../../../../src/app/globals.css";

function Menu({ handleDeleteSubNote }) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div
        className={`arrow-icon ${isActive ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <p
          className={`w-fit rounded-md px-1 text-blue-600 duration-[25ms] hover:bg-slate-200 ${
            isActive ? "bg-slate-200" : "bg-slate-100"
          }`}
          style={{ userSelect: "none" }}
        >
          ...
        </p>
      </div>
      <div
        className="absolute right-[-70px] top-[-5px] w-fit overflow-auto border border-gray-300 bg-white shadow-lg"
        style={{ display: isActive ? "block" : "none" }}
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
