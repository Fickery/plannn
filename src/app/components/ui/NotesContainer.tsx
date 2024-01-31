"use client";
import useDragger from "@/hooks/useDragger";
import { UniqueIdentifier } from "@dnd-kit/core";
import randomColor from "randomcolor";
import { useState } from "react";
import Draggable from "react-draggable";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addNote,
  deleteNote,
  duplicateNote,
} from "../../../redux/reducers/notesSlice";
import AddBtn from "../AddBtn";
import ImageDropdownArrow from "../ImageDropdownArrow";
import NoteDropdown from "./NoteDropdown";

type randomColorProps = {
  luminosity: "light" | "bright" | "dark" | "random" | undefined;
};

type NoteProp = {
  id: UniqueIdentifier;
  title: string;
  color: string;
  placeholder: string;
};

const generateUniqueId = () => {
  return uuidv4();
};

export default function NotesContainer() {
  const [images, setImages] = useState([]);
  const [lastAddedNoteName, setLastAddedNoteName] = useState("");
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  const param: randomColorProps = {
    luminosity: "light",
  };

  const handleAddNote = () => {
    const newNote = {
      id: generateUniqueId(),
      name: notes.length + 1,
      title: "New Note",
      color: randomColor(param),
      placeholder: "Your placeholder text here",
    };

    dispatch(addNote(newNote));
    setLastAddedNoteName(newNote.name); // Update the last added note name in the state
    console.log(`successfully added note ${newNote.name}`);
  };

  const handleDuplicate = (noteId) => {
    dispatch(duplicateNote(noteId));
  };

  const handleDeleteNote = (id) => {
    if (!confirm(`Are you sure you want to delete note ${lastAddedNoteName}?`))
      return;
    dispatch(deleteNote(id));
    console.log(`successfully deleted note ${id}`);
  };

  const handleAddImg = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  useDragger("addBtn");

  return (
    <div className="main-container">
      <ImageUploading
        multiple
        value={images}
        onChange={handleAddImg}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
          <div>
            <AddBtn
              onImageUpload={onImageUpload}
              handleAddNote={handleAddNote}
            />

            {notes.map((note: NoteProp) => (
              <Draggable key={note.id} defaultPosition={{ x: 750, y: 250 }}>
                <div
                  id={`note-${note.id}`}
                  className="absolute h-[20%] w-[15%] cursor-pointer opacity-70"
                  style={{ backgroundColor: note.color }}
                >
                  <div>
                    <div className="flex w-full justify-end">
                      <NoteDropdown
                        onDelete={() => handleDeleteNote(note.id)}
                        onDuplicate={() => handleDuplicate(note.id)}
                      />
                    </div>
                    <input
                      placeholder="Title here"
                      className="mx-auto mb-3 flex flex-row-reverse justify-center bg-inherit text-center text-sm outline-none placeholder:text-gray-500"
                    />
                  </div>
                  <div className="h-full w-full bg-blue-300">
                    {note.placeholder}
                  </div>
                  <button className="bottom-0 flex w-full justify-center bg-inherit p-5 text-xs text-darkblue opacity-70 hover:opacity-100">
                    Add More Nodes +
                  </button>
                </div>
              </Draggable>
            ))}

            {imageList.map((image, index) => (
              <Draggable key={image.id} defaultPosition={{ x: 350, y: 550 }}>
                <div
                  className="absolute cursor-pointer bg-white"
                  id={`image-${image.id}`}
                >
                  <div>
                    <div className="absolute flex w-full justify-end"></div>
                    <img draggable={false} src={image.data_url} width="200" />
                    <ImageDropdownArrow
                      onImageRemove={onImageRemove}
                      onImageUpdate={onImageUpdate}
                      index={index}
                    />
                  </div>
                </div>
              </Draggable>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
