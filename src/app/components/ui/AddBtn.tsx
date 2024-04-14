import useDragger from "@/hooks/useDragger";
import { AddBtnProps } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";

const generateUniqueId = () => {
  return uuidv4();
};

const AddBtn = ({ onImageUpload, handleAddNote }: AddBtnProps) => {
  const handleAddImg = () => {
    const image = {
      id: generateUniqueId(),
    };
    onImageUpload(image.id);
  };

  useDragger("addBtn");

  return (
    <div id="addBtn" className="absolute h-2 w-6 cursor-pointer p-2">
      <div className="add">
        <div className="addBtn">
          <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-blue-700 text-white shadow-[0_3px_10px_rgb(0,0,0,0.25)] transition-all hover:h-[35px] hover:w-[35px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.2)] ">
            <button
              className="absolute top-[12px] text-[1.5rem]"
              onClick={handleAddNote}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex h-[48px] w-full items-center justify-center bg-white text-blue-700 shadow-boxshadowfilter">
          <button
            className="mx-auto flex justify-center text-xs opacity-30 hover:opacity-100"
            onClick={handleAddImg}
          >
            + img
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBtn;
