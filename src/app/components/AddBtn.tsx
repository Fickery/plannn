import useDragger from "@/hooks/useDragger";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../redux/actions/notesAction";
import randomColor from "randomcolor";

function AddBtn() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const param = {
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

  const handleDeleteNote = (id: number) => {
    console.log(id);
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
        <button className="addImg" onClick={handleAddNote}>
          + img
        </button>
      </div>
    </div>
  );
}

export default AddBtn;
