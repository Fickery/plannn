import useDragger from "@/hooks/useDragger";
import { AddBtnProps } from "@/utils/types";

const AddBtn = ({ handleAddNote }: AddBtnProps) => {
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
      </div>
    </div>
  );
};

export default AddBtn;
