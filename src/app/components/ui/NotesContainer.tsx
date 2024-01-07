"use client";
import useDragger from "@/hooks/useDragger";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import AddBtn from "../AddBtn";
import Menu from "./Menu";

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
            <div>
              <div className="flex w-full justify-end">
                <Menu />
              </div>
              <input
                placeholder="Title here"
                className="flex- mx-auto mb-3 mt-1 flex flex-row-reverse justify-center bg-inherit text-center outline-none placeholder:text-gray-600"
              />
            </div>
            {note.content}
            <button className="text-darkblue absolute bottom-0 flex w-full justify-center p-8 hover:opacity-50">
              Add More Nodes +
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
}
