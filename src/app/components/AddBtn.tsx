import useDragger from "@/hooks/useDragger";
import randomColor from "randomcolor";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addNote } from "../../redux/actions/notesAction";

type AddBtnProps = {
  onImageUpload: (id: string) => void;
};

type randomColorProps = {
  luminosity: "light" | "bright" | "dark" | "random" | undefined;
};

const generateUniqueId = () => {
  return uuidv4();
};

const AddBtn = ({ onImageUpload }: AddBtnProps) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const param: randomColorProps = {
    luminosity: "light",
  };

  const handleColor = randomColor(param);

  const handleAddNote = () => {
    const note = {
      id: notes.length + 1,
      title: "New Note",
      content: "",
      subNotes: [],
      color: handleColor,
    };
    dispatch(addNote(note));
    console.log(note.id);
  };

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
        <div className="shadow-boxshadow flex h-[48px] w-full items-center justify-center text-blue-700">
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
