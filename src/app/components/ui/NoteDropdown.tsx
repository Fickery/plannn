import { NoteDropdownProps } from "@/utils/types";
import { useState } from "react";
import Menu from "./Menu";

function NoteDropdown({ onDelete, onDuplicate }: NoteDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleDuplicate = () => {
  //   console.log("duplicate");
  //   onDuplicate();
  //   toggleDropdown();
  // };

  const handleDelete = () => {
    confirm("Are you sure you want to delete this note?");
    onDelete();
    toggleDropdown();
  };

  return (
    <div className="z-50 w-fit ">
      <div className="flex h-full w-full justify-end" onClick={toggleDropdown}>
        <Menu
          onMenuClick={toggleDropdown}
          showXIcon={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div
        className="absolute top-10 w-fit overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {/* <div
          onClick={handleDuplicate}
          className="cursor-pointer p-2 text-midblue hover:bg-darkblue hover:text-white"
        >
          Duplicate
        </div> */}
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
