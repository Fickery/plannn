import { updateText } from "@/redux/reducers/notesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IconDropDown from "./ui/IconDropDown";
import { Textarea } from "@nextui-org/input";
import DeleteIcon from "./ui/DeleteIcon";

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
    <div className="flex h-auto w-full items-center justify-center gap-1 rounded-md bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1">
      <div className="relative flex h-[50px] justify-center bg-slate-100">
        <IconDropDown
          subNote={subNote}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleIconChange={handleIconChange}
        />
      </div>

      <div className="flex w-full justify-end">
        <div className="w-auto flex-col">
          <div className="flex justify-end">
            <p className="bg-blue w-fit rounded bg-slate-100 px-1 text-right text-blue-600 duration-[25ms] hover:bg-slate-200">
              ...
            </p>
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
      </div>
    </div>
  );
}

export default SubNote;
