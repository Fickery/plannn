import { NoteContProps } from "@/utils/types";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import NoteDropdown from "./ui/NoteDropdown";
import SubNote from "./SubNote";

function NoteCont({
  notes,
  handleDelete,
  handleDuplicate,
  handleTitleChange,
  handleAddSubNote,
  handleSubNoteUpdate,
}: NoteContProps) {
  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const hexToRgba = (hex: string, opacity: number) => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  const adjustedOpacity = 0.35;

  // const randPos = () => {
  //   const randX = Math.random() * window.innerWidth - 150;
  //   const randY = Math.random() * window.innerHeight - 100;
  //   return { x: randX, y: randY };
  // };

  const handleDrag = (e, position: { x: number; y: number }) => {
    const noteId = e.target.id;
    const newPosition = { x: position.x, y: position.y };
    setPositions((prevPositions) => ({
      ...prevPositions,
      [noteId]: newPosition,
    }));
    localStorage.setItem(
      "notePositions",
      JSON.stringify({
        ...positions,
        [noteId]: newPosition,
      }),
    );
  };

  useEffect(() => {
    const savedPositions = JSON.parse(
      localStorage.getItem("notePositions") || "{}",
    );
    setPositions(savedPositions);
  }, []);

  useEffect(() => {
    localStorage.setItem("notePositions", JSON.stringify(positions));
  }, [positions]);

  return (
    <div>
      {notes.map((note) => {
        const backgroundColor = hexToRgba(note.color, adjustedOpacity);

        return (
          <Draggable
            key={note.id}
            onStop={(e, data) => handleDrag(e, { x: data.x, y: data.y })}
            cancel=".no-drag"
          >
            <div
              id={`note-${note.id}`}
              className="absolute flex w-[15%] cursor-pointer flex-col gap-5 shadow-boxshadow"
              style={{
                backgroundColor,
              }}
            >
              <div>
                <div className="flex w-full justify-end">
                  <NoteDropdown
                    onDelete={() => handleDelete(note.id)}
                    onDuplicate={() => handleDuplicate(note.id)}
                  />
                </div>
                <input
                  placeholder="New Note"
                  name="cardTitle"
                  autoComplete="off"
                  value={note.title}
                  className="no-drag mx-auto flex flex-row-reverse justify-center bg-inherit text-center text-xs font-bold outline-none placeholder:font-thin placeholder:drop-shadow-sm"
                  onChange={(e) => handleTitleChange(e, note.id)}
                />
              </div>

              <div className="no-drag relative z-40 flex flex-col gap-2 px-3">
                {note.subNotes &&
                  note.subNotes.map((subNote) => (
                    <SubNote
                      key={subNote.id}
                      notes={notes}
                      handleSubNoteUpdate={handleSubNoteUpdate}
                    />
                  ))}
              </div>
              <div>
                <button className="relative flex w-full justify-center bg-inherit text-xs text-gray-600 hover:text-darkblue">
                  <div className="p-5">
                    <div
                      style={{ opacity: adjustedOpacity }}
                      className="relative z-0 w-full"
                    ></div>
                    <span
                      className="w-full p-2 text-center"
                      onClick={() => handleAddSubNote(note.id)}
                    >
                      Add More Nodes +
                    </span>
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
