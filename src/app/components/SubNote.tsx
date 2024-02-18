import { useState } from "react";
import IconDropDown from "./IconDropDown";

function SubNote() {
  const [text, setText] = useState("Click here to type...");

  const handleDivClick = () => {
    if (text === "Click here to type...") {
      setText("");
    }
  };

  return (
    <div className="flex justify-between gap-1 bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1">
      <div className="relative flex w-1/6 justify-center">
        <IconDropDown />
      </div>
      <div
        className="mx-auto flex w-5/6 resize-none items-center justify-center font-['Open_Sans'] text-xs font-medium !outline-none"
        contentEditable={true}
        onClick={handleDivClick}
        spellCheck={false}
      >
        {text}
      </div>
    </div>
  );
}

export default SubNote;
