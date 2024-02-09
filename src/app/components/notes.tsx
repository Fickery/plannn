import React from "react";
import useDragger from "@/hooks/useDragger";

const DraggableNote = ({ note }) => {
  useDragger(note.id);

  return (
    <div id={note.id} className="h-[30%] w-[15%] bg-slate-300">
      {note.content}
    </div>
  );
};

export default DraggableNote;
