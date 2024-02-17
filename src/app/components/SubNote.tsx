import React from "react";

import { Textarea } from "@nextui-org/react";
import IconDropDown from "./IconDropDown";

function SubNote() {
  return (
    <div className="flex justify-between gap-1 bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1">
      <div className="relative flex w-1/6 justify-center">
        <IconDropDown />
      </div>
      <Textarea
        className="bg mx-auto flex w-5/6 resize-none justify-center text-xs !outline-none"
        placeholder="notes..."
        minRows={2}
        maxRows={3}
      />
    </div>
  );
}

export default SubNote;
