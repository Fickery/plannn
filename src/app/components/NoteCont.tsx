import React from "react";
import Draggable from "react-draggable";
import NoteDropdown from "./NoteDropdown";
import SubNote from "./SubNote";

function NoteCont({
  notes,
  handleDeleteNote,
  handleDuplicate,
  handleTitleChange,
}) {
  return (
    <div>
      {notes.map((note: NoteProp) => (
        <Draggable key={note.id} defaultPosition={{ x: 750, y: 250 }}>
          <div
            id={`note-${note.id}`}
            className="absolute h-[20%] w-[15%] cursor-pointer"
            style={{ backgroundColor: note.color }}
          >
            <div>
              <div className="flex w-full justify-end">
                <NoteDropdown
                  onDelete={() => handleDeleteNote(note.id)}
                  onDuplicate={() => handleDuplicate(note.id)}
                />
              </div>
              <input
                placeholder="New Note"
                name="cardTitle"
                value={note.title}
                className="mx-auto mb-3 flex flex-row-reverse justify-center bg-inherit text-center text-sm font-black outline-none placeholder:text-gray-500 "
                onChange={(e) => handleTitleChange(e, note.id)}
              />
            </div>
            <div className="h-full w-full bg-inherit px-3">
              <SubNote />
            </div>
            <button className="relative bottom-0 mt-1 flex w-full justify-center p-5 text-xs text-gray-600 hover:text-darkblue">
              <div className="relative w-full bg-inherit opacity-80"></div>
              <span className="relative z-10">Add More Nodes +</span>
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default NoteCont;
