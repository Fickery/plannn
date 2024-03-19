"use client";
import React, { ChangeEvent, useState } from "react";
import AutosizeInput from "react-input-autosize";

export default function Titles() {
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="center relative gap-1">
        {/* {topicNames.map((topic, index) => (
          <p key={index}>{topic}</p>
        ))} */}
        <AutosizeInput
          className="flex flex-col items-center justify-center text-center text-sm font-semibold placeholder:font-normal focus:outline-none"
          name="title"
          placeholder="title"
          autoCorrect="off"
          autoCapitalize="off"
          value={title}
          onChange={handleTitleChange}
        />
        <span
          className={`dropdown-arrow onClick ${
            isActive ? "dropdown-arrow-down" : ""
          }`}
          onClick={toggleDropdown}
        ></span>
        <div>
          {isActive ? (
            <div className="shadow-xs absolute left-0 top-10 w-fit overflow-auto border bg-white">
              <div className="p-2 text-midblue hover:bg-darkblue hover:text-white">
                Topic 1
              </div>
              <div className="p-2 text-midblue hover:bg-darkblue hover:text-white">
                Topic 2
              </div>
              <div className="p-2 text-midblue hover:bg-darkblue hover:text-white">
                Topic 3
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
