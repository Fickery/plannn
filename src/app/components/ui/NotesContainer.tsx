"use client";
import useDragger from "@/hooks/useDragger";
import { useState } from "react";
import Draggable from "react-draggable";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, duplicateNote } from "../../../redux/actions/notesAction";
import AddBtn from "../AddBtn";
import NoteDropdown from "./NoteDropdown";
import ImageDropdownArrow from "../ImageDropdownArrow";

export default function NotesContainer() {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const handleAddImg = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleDuplicate = (noteId) => {
    dispatch(duplicateNote(noteId));
  };

  const handleDeleteNote = (id: number) => {
    if (!confirm(`Are you sure you want to delete note ${id}?`)) return;
    dispatch(deleteNote(id));
    console.log(`successfully deleted note ${id}`);
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
            <AddBtn onImageUpload={onImageUpload} />

            {notes.map((note) => (
              <Draggable defaultPosition={{ x: 750, y: 250 }} key={note.id}>
                <div
                  id={`note-${note.id}`}
                  className="absolute h-[20%] w-[15%] cursor-pointer opacity-70 shadow-boxshadow1"
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
                      placeholder={note.title}
                      className="mx-auto mb-3 flex flex-row-reverse justify-center bg-inherit text-center text-sm outline-none placeholder:text-gray-500"
                    />
                  </div>
                  <div className="h-full w-full bg-blue-300">
                    {/* 
                    {subNotes.map((subNote) => (
                      <div className="flex flex-col justify-center">
                        <input
                          placeholder="SubNote here"
                          className="mx-auto mb-3 flex flex-row-reverse justify-center bg-inherit text-center text-sm outline-none placeholder:text-gray-500"
                        />
                      </div>
                    ))} */}
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
