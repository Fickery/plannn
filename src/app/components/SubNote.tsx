import { updateSubNote } from "@/redux/reducers/notesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IconDropDown from "./ui/IconDropDown";

function SubNote({ note, subNote }) {
  const [text, setText] = useState(subNote.text);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedText = localStorage.getItem(`savedText_${subNote.id}`);
    if (savedText) {
      setText(savedText);
    }
  }, [subNote.id]);

  const handleChangeText = (e) => {
    const updatedText = e.target.value;
    setText(updatedText);
    dispatch(
      updateSubNote({
        id: subNote.id,
        icon: selectedImage,
        text: updatedText,
      }),
    );
    localStorage.setItem(`savedText_${subNote.id}`, updatedText);
  };

  return (
    <div className="flex w-full items-center justify-center gap-1 bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1">
      <div className="relative flex h-[50px] w-1/6 justify-center">
        <IconDropDown
          subNote={subNote}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>

      <div className="w-5/6">
        <input
          className="mx-auto flex resize-none overflow-auto break-all text-xs font-medium !outline-none"
          spellCheck={false}
          value={text}
          placeholder="Click here to type.."
          onChange={handleChangeText}
        />
      </div>
    </div>
  );
}

export default SubNote;
