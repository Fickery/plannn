"use client";
import useDragger from "@/hooks/useDragger";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import AddBtn from "../AddBtn";

export default function NotesContainer() {
  const notes = useSelector((state) => state.notes.notes);

  const handleDeleteNote = (id: number) => {
    console.log(`Deleting note with id: ${id}`);
  };

  useDragger("addBtn");

  return (
    <div className="main-container">
      <AddBtn />
      {notes.map((note) => (
        <Draggable defaultPosition={{ x: 750, y: 250 }} key={note.id}>
          <div
            id={`note-${note.id}`}
            onClick={() => handleDeleteNote(note.id)}
            className="shadow-boxshadow1 absolute h-[30%] w-[15%] cursor-pointer opacity-70"
            style={{ backgroundColor: note.color }}
          >
            <div className="w-50 p-50 bg-slate-800">f</div>
            {note.content}
          </div>
        </Draggable>
      ))}
    </div>
  );
}
