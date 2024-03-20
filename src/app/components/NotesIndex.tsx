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
  addSession,
  addSubNote,
  deleteNote,
  duplicateNote,
  updateNote,
  updateSubNoteText,
} from "../../redux/reducers/notesSlice";
import ImageCont from "./ImageCont";
import NoteCont from "./NoteCont";
import AddBtn from "./ui/AddBtn";
import Titles from "./ui/Titles";

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
  const notes = useSelector((state) => state.notes.sessions);
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

  const handleAddSession = () => {
    const newSession = {
      id: generateUniqueId(),
      title: "",
      notes: [],
    };
    dispatch(addSession(newSession));
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

  const handleAddSubNote = (sessionId: string, noteId: string) => {
    const subNote = {
      id: generateUniqueId(),
      icon: "",
      text: "",
    };
    dispatch(addSubNote({ sessionId: sessionId, noteId: noteId, subNote }));
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
            <Titles
              notes={notes}
              handleAddSession={handleAddSession}
              title="title"
              setTitle={() => {}}
            />
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
