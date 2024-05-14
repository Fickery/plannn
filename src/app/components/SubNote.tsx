import { updateText } from "@/redux/reducers/notesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IconDropDown from "./ui/IconDropDown";
import { Textarea } from "@nextui-org/input";

function SubNote({ subNote }) {
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
    <div className="flex h-auto w-full items-center justify-center gap-1 bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1">
      <div className="relative flex h-[50px] w-1/6 justify-center">
        <IconDropDown
          subNote={subNote}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleIconChange={handleIconChange}
        />
      </div>

      <Textarea
        classNames={{
          base: "max-w-xs mt-2",
          input: "resize-y min-h-[10px] text-xs",
        }}
        spellCheck={false}
        disableAnimation
        disableAutosize
        value={text}
        placeholder="Click here to type.."
        onChange={handleChangeText}
      />
    </div>
  );
}

export default SubNote;
