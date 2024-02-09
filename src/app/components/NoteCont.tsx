import React from "react";
import Draggable from "react-draggable";
import NoteDropdown from "./NoteDropdown";

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
            className="absolute h-[20%] w-[15%] cursor-pointer opacity-80"
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
                className="mx-auto mb-3 flex flex-row-reverse justify-center bg-inherit text-center text-sm outline-none placeholder:text-gray-500"
                onChange={(e) => handleTitleChange(e, note.id)}
              />
            </div>
            <div className="h-full w-full bg-blue-300">{note.placeholder}</div>
            <button className="bottom-0 flex w-full justify-center bg-inherit p-5 text-xs text-darkblue opacity-70 hover:opacity-100">
              Add More Nodes +
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default NoteCont;
