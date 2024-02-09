import React, { useState } from "react";
import MenuArrowDown from "./ui/MenuArrowDown";

type ImageDropdownArrowProps = {
  onImageUpdate: (index: number) => void;
  onImageRemove: (index: number) => void;
  index: number;
};

function ImageDropdownArrow({
  onImageUpdate,
  onImageRemove,
  index,
}: ImageDropdownArrowProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleImageUpdate = () => {
    onImageUpdate(index);
    toggleDropdown();
  };

  const handleImageRemove = () => {
    onImageRemove(index);
    toggleDropdown();
  };

  return (
    <div className="shadow-boxshadow opacity-70">
      <div
        style={{ display: isActive ? "flex" : "none" }}
        className="bottom-0 flex w-full justify-around bg-inherit text-xs text-darkblue"
      >
        <button
          className="h-full w-full bg-inherit p-3 hover:bg-darkblue hover:text-white"
          onClick={handleImageUpdate}
        >
          Change
        </button>
        <button
          className="h-full w-full bg-inherit p-3 font-semibold text-red-700 hover:bg-red-200"
          onClick={handleImageRemove}
        >
          Remove
        </button>
      </div>
      <div
        className="relativeflex h-full w-full justify-center border-gray-300"
        onClick={toggleDropdown}
      >
        <MenuArrowDown />
      </div>
    </div>
  );
}

export default ImageDropdownArrow;
