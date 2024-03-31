import React, { useState } from "react";
import Menu from "./ui/Menu";

type NoteDropdownProps = {
  onDuplicate: () => void;
};

function NoteDropdown({ onDuplicate }: NoteDropdownProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleDuplicate = () => {
    console.log("duplicate");
    onDuplicate();
    toggleDropdown();
  };

  const handleDelete = () => {
    toggleDropdown();
  };

  return (
    <div className="z-50 w-fit ">
      <div className="flex h-full w-full justify-end" onClick={toggleDropdown}>
        <Menu onMenuClick={toggleDropdown} showXIcon={isActive} />
      </div>
      <div
        className="absolute top-10 w-fit overflow-auto border border-gray-300 bg-white shadow-lg"
        style={{ display: isActive ? "block" : "none" }}
      >
        <div
          onClick={handleDuplicate}
          className="cursor-pointer p-2 text-midblue hover:bg-darkblue hover:text-white"
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
