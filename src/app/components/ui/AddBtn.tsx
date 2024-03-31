import useDragger from "@/hooks/useDragger";
import { v4 as uuidv4 } from "uuid";

type AddBtnProps = {
  onImageUpload: (id: string) => void;
  handleAddNote: () => void;
};

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
    <div id="addBtn" className="absolute h-8 w-10 cursor-pointer bg-slate-600">
      <div className="add">
        <div className="addBtn">
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-blue-700 text-white shadow-[0_3px_10px_rgb(0,0,0,0.25)] transition-all hover:h-[55px] hover:w-[55px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.2)] ">
            <button
              className="absolute top-[14px] text-[2.8rem]"
              onClick={handleAddNote}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex h-[48px] w-full items-center justify-center bg-white text-blue-700 shadow-boxshadowfilter">
          <button
            className="mx-auto flex justify-center text-sm opacity-30 hover:opacity-100"
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
