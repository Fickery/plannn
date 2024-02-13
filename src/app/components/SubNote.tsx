import React from "react";

import { Textarea } from "@nextui-org/react";
import IconDropDown from "./IconDropDown";

function SubNote() {
  return (
    <div className="flex justify-between gap-3 bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1">
      <div className="relative flex w-1/5 justify-center">
        <IconDropDown />
      </div>
      <Textarea
        className="mx-auto flex w-4/5 justify-center text-xs focus:outline-none"
        placeholder="notes..."
        minRows={2}
        maxRows={3}
      />
    </div>
  );
}

export default SubNote;
