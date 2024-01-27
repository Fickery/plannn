import React, { useState } from "react";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { updateImage } from "../../../redux/actions/imagesAction";

type NoteDropdownProps = {
  onDelete: () => void;
  onImageUpdate: (id: string) => void;
};

function NoteDropdown({ onDelete, onImageUpdate }: NoteDropdownProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const images = useSelector((state) => state.images.images);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleDelete = () => {
    onDelete();
    toggleDropdown();
  };

  const handleUpdate = (id: string) => {
    const updateImg = images.find((image) => image.id === id);
    if (updateImg) {
      dispatch(updateImage(id, { ...updateImg }));
    }
    onImageUpdate(id);
    toggleDropdown();
  };

  return (
    <div className="w-fit">
      <div
        className="relative z-50 flex h-full w-full justify-end"
        onClick={toggleDropdown}
      >
        <Menu onMenuClick={toggleDropdown} showXIcon={isActive} />
      </div>
      <div
        className="absolute top-10 z-[999] w-fit overflow-auto border border-gray-300 bg-white shadow-lg"
        style={{ display: isActive ? "block" : "none" }}
      >
        <div
          className="cursor-pointer p-2 hover:bg-gray-100"
          onClick={handleUpdate}
        >
          Change
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
