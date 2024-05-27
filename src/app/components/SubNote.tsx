import { updateText } from "@/redux/reducers/notesSlice";
import { Textarea } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IconDropDown from "./ui/IconDropDown";
import SubMenuDropdownArrow from "./ui/SubMenuDropdownArrow";

function SubNote({ subNote, noteId, handleDeleteSubNote }) {
  const [text, setText] = useState(subNote.text);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedText = localStorage.getItem(`savedText_${subNote.id}`);
    if (savedText) {
      setText(savedText);
    }
  }, [subNote.id]);

  const handleIconChange = (newSelectedImage) => {
    setSelectedImage(newSelectedImage);
  };

  const handleChangeText = (e) => {
    const updatedText = e.target.value;
    setText(updatedText);
    dispatch(
      updateText({
        id: subNote.id,
        text: updatedText,
      }),
    );
    console.log(subNote.id);
    localStorage.setItem(`savedText_${subNote.id}`, updatedText);
  };

  return (
    <div className="flex h-auto w-full items-center justify-around gap-1 rounded-md bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1 sm:h-[2rem] md:h-[3rem] lg:h-[4rem]">
      <div className="flex h-auto rounded-md bg-slate-100">
        <IconDropDown
          subNote={subNote}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleIconChange={handleIconChange}
        />
      </div>
      <div className="flex flex-row md:items-center md:justify-center">
        <div className="flex flex-col items-end justify-end text-right">
          <Textarea
            classNames={{
              base: "max-w-xs mt-2",
              input: "resize-y min-h-[18px] text-xs md:text-[0.7rem]",
            }}
            spellCheck={false}
            disableAnimation
            disableAutosize
            value={text}
            placeholder="Click here to type.."
            onChange={handleChangeText}
          />
        </div>
        <div className="relative">
          <SubMenuDropdownArrow
            handleDeleteSubNote={() => handleDeleteSubNote(subNote.id)}
          />
        </div>
      </div>
    </div>
  );
}

export default SubNote;
