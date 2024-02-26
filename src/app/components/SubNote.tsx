import IconDropDown from "./IconDropDown";

function SubNote({ notes, handleSubNoteUpdate }) {
  return (
    <div className="flex w-full items-center justify-center gap-1 bg-white p-3 shadow-boxshadow hover:shadow-boxshadow1">
      <div className="relative flex h-[50px] w-1/6 justify-center">
        <IconDropDown />
      </div>
      <div className="w-5/6">
        <div
          className="mx-auto flex resize-none overflow-auto break-all text-xs font-medium !outline-none"
          contentEditable={true}
          spellCheck={false}
          data-placeholder="Click here to type..."
          onInput={handleSubNoteUpdate}
        ></div>
      </div>
    </div>
  );
}

export default SubNote;
