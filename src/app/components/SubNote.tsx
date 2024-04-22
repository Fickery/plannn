import { useEffect, useState } from "react";
import IconDropDown from "./ui/IconDropDown";
import { useDispatch } from "react-redux";
import { updateSubNote } from "@/redux/reducers/notesSlice";

function SubNote({ note, subNote, handleSubNoteUpdate }) {
  const [text, setText] = useState(subNote.text);
  const dispatch = useDispatch();

  const handleChangeText = (e, subNoteId) => {
    const updatedText = e.target.value;
    setText(updatedText);
    dispatch(
      updateSubNote({ id: note.id, subNoteId: subNoteId, text: updatedText }),
    );
    localStorage.setItem("savedText", updatedText);
  };

  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  return (
    <div className="flex w-full items-center justify-center gap-1 bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1">
      <div className="relative flex h-[50px] w-1/6 justify-center">
        <IconDropDown />
      </div>

      <div className="w-5/6">
        <input
          className="mx-auto flex resize-none overflow-auto break-all text-xs font-medium !outline-none"
          spellCheck={false}
          value={text}
          placeholder="Click here to type.."
          onChange={(e) => handleChangeText(e, subNote.id)}
        />
      </div>
    </div>
  );
}

export default SubNote;
