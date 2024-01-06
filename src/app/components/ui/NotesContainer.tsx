"use client";
import useDragger from "@/hooks/useDragger";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import AddBtn from "../addBtn";

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
        <Draggable defaultPosition={{ x: 750, y: 250 }}>
          <div
            id={`note-${note.id}`}
            onClick={() => handleDeleteNote(note.id)}
            className="absolute h-[30%] w-[15%] cursor-pointer bg-slate-300"
            key={note.id}
          >
            {note.content}
          </div>
        </Draggable>
      ))}
    </div>
  );
}
