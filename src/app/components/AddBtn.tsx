import useDragger from "@/hooks/useDragger";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../redux/actions/notesAction";

function AddBtn() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const handleAddNote = () => {
    const note = {
      id: notes.length + 1,
      title: "New Note",
      content: "",
      subNotes: [],
    };
    dispatch(addNote(note));
    console.log(note.id);
  };

  const handleDeleteNote = (id: number) => {
    console.log(id);
  };
  useDragger("addBtn");
  return (
    <div
      id="addBtn"
      className="absolute left-0 top-0 h-8 w-10 cursor-pointer bg-slate-600"
    >
      <div className="add">
        <div className="addBtn">
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-blue-700 text-[2.8rem] text-white shadow-[0_3px_10px_rgb(0,0,0,0.25)] transition-all hover:h-[55px] hover:w-[55px] hover:text-[2.5rem] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.2)] ">
            <button
              className="delay-5 absolute top-[14px] transition ease-out hover:top-[18px]"
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
