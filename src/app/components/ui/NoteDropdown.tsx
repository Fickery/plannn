import React, { useState } from "react";
import Menu from "./Menu";

function NoteDropdown({ onDelete }: { onDelete: () => void }) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleDelete = () => {
    onDelete();
    toggleDropdown();
  };

  return (
    <div className="w-fit">
      <div
        className="relative z-50 flex h-full w-full justify-end"
        onClick={toggleDropdown}
      >
        <Menu onMenuClick={toggleDropdown} />
      </div>
      <div
        className="absolute top-10 z-[999] w-fit overflow-auto border border-gray-300 bg-white shadow-lg"
        style={{ display: isActive ? "block" : "none" }}
      >
        <div
          onClick={toggleDropdown}
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          Duplicate
        </div>
        <div
          className="cursor-pointer p-2 font-semibold text-red-700 hover:bg-red-200"
          onClick={handleDelete}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default NoteDropdown;
