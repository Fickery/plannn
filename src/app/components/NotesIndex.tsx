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
  addSubNote,
  deleteNote,
  duplicateNote,
  updateNote,
  updateSubNoteText,
} from "../../redux/reducers/notesSlice";
import ImageCont from "./ImageCont";
import NoteCont from "./NoteCont";
import AddBtn from "./ui/AddBtn";

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
  const [title, setTitle] = useState("title");
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

  const handleSubNoteUpdate = (e, subNoteId) => {
    const updatedSubNote = e.target.value;
    dispatch(updateSubNoteText({ id: subNoteId, text: updatedSubNote }));
  };

  const handleAddNote = () => {
    const newNote = {
      id: generateUniqueId(),
      name: notes.length + 1,
      title: "",
      color: randomColor(param),
      subNotes: [],
    };

    dispatch(addNote(newNote));

    console.log(`successfully added note ${newNote.name}`);
  };

  const handleAddSubNote = (noteId) => {
    dispatch(addSubNote({ id: noteId }));
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

  const handleTitleChangeInput = (e) => {
    setTitle(e.target.innerText);
  };

  useDragger("addBtn");

  return (
    <div className="main-container">
      {/* <button
        onClick={handleLogAllNotes}
        className="mt-4 rounded-md bg-gray-200 p-2"
      >
        Log All Notes
      </button> */}
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
              handleAddSubNote={handleAddSubNote}
              handleSubNoteUpdate={handleSubNoteUpdate}
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
