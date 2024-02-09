"use client";
import useDragger from "@/hooks/useDragger";
import { UniqueIdentifier } from "@dnd-kit/core";
import randomColor from "randomcolor";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addNote,
  deleteNote,
  duplicateNote,
  updateNote,
} from "../../redux/reducers/notesSlice";
import AddBtn from "./ui/AddBtn";
import ImageCont from "./ImageCont";
import NoteCont from "./NoteCont";

type randomColorProps = {
  luminosity: "light" | "bright" | "dark" | "random" | undefined;
};

export type NoteProp = {
  id: UniqueIdentifier;
  title: string;
  color: string;
  placeholder: string;
};

const generateUniqueId = () => {
  return uuidv4();
};

export default function NotesIndex() {
  const [images, setImages] = useState([]);
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  const param: randomColorProps = {
    luminosity: "light",
  };

  const handleTitleChange = (e, noteId) => {
    const updatedTitle = e.target.value;
    dispatch(updateNote({ id: noteId, title: updatedTitle }));
  };

  const handleAddNote = () => {
    const newNote = {
      id: generateUniqueId(),
      name: notes.length + 1,
      title: "",
      color: randomColor(param),
    };

    dispatch(addNote(newNote));

    console.log(`successfully added note ${newNote.name}`);
  };

  const handleDuplicate = (noteId) => {
    dispatch(duplicateNote(noteId));
  };

  const handleDeleteNote = (id) => {
    if (!confirm(`Are you sure you want to delete note ?`)) return;
    dispatch(deleteNote(id));
    console.log(`successfully deleted note ${id}`);
  };

  const handleAddImg = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleLogAllNotes = () => {
    console.log("All notes:", notes);
  };

  useDragger("addBtn");

  return (
    <div className="main-container">
      <button
        onClick={handleLogAllNotes}
        className="mt-4 rounded-md bg-gray-200 p-2"
      >
        Log All Notes
      </button>
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

            <NoteCont
              notes={notes}
              handleDeleteNote={handleDeleteNote}
              handleDuplicate={handleDuplicate}
              handleTitleChange={handleTitleChange}
            />
            <ImageCont
              imageList={imageList}
              onImageRemove={onImageRemove}
              onImageUpdate={onImageUpdate}
            />
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
