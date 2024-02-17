import React from "react";
import Draggable from "react-draggable";
import NoteDropdown from "./NoteDropdown";
import SubNote from "./SubNote";

// Import SubNote at the top of your file

function NoteCont({
  notes,
  handleDeleteNote,
  handleDuplicate,
  handleTitleChange,
}) {
  return (
    <div>
      {notes.map((note) => {
        const hexToRgba = (hex, opacity) => {
          hex = hex.replace(/^#/, "");
          const bigint = parseInt(hex, 16);
          const r = (bigint >> 16) & 255;
          const g = (bigint >> 8) & 255;
          const b = bigint & 255;
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        };

        const adjustedOpacity = 0.35;

        const backgroundColor = hexToRgba(note.color, adjustedOpacity);

        return (
          <Draggable
            key={note.id}
            defaultPosition={{ x: 750, y: 250 }}
            cancel=".no-drag"
          >
            <div
              id={`note-${note.id}`}
              className="absolute flex w-[15%] cursor-pointer flex-col gap-5"
              style={{
                backgroundColor,
              }}
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
                  className="mx-auto flex flex-row-reverse justify-center bg-inherit text-center text-xs font-bold outline-none placeholder:font-thin placeholder:opacity-60 placeholder:drop-shadow-sm"
                  onChange={(e) => handleTitleChange(e, note.id)}
                />
              </div>
              <div className="no-drag relative z-40 flex flex-col gap-2 px-3">
                <SubNote />
              </div>
              <div>
                <button className="relative flex w-full justify-center bg-inherit text-xs text-gray-600 hover:text-darkblue">
                  <div className="p-5">
                    <div
                      style={{ opacity: adjustedOpacity }}
                      className="relative z-0 w-full"
                    ></div>
                    <span className="w-full text-center">Add More Nodes +</span>
                  </div>
                </button>
              </div>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default NoteCont;
