"use client";
import useDragger from "@/hooks/useDragger";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../../redux/actions/notesAction";
import AddBtn from "../AddBtn";
import NoteDropdown from "./NoteDropdown";
import { useState } from "react";
import ImageUploading from "react-images-uploading";

export default function NotesContainer() {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  // const maxImages = 10;

  const handleAddImg = (imageList, addUpdateIndex) => {
    setImages(imageList);
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
        {({ imageList, onImageUpload, onImageUpdate }) => (
          <div>
            <AddBtn onImageUpload={onImageUpload} />

            {notes.map((note) => (
              <Draggable defaultPosition={{ x: 750, y: 250 }} key={note.id}>
                <div
                  id={`note-${note.id}`}
                  className="absolute h-[30%] w-[15%] cursor-pointer opacity-70 shadow-boxshadow1"
                  style={{ backgroundColor: note.color }}
                >
                  <div>
                    <div className="flex w-full justify-end">
                      <NoteDropdown
                        onDelete={() => handleDeleteNote(note.id)}
                      />
                    </div>
                    <input
                      placeholder="Title here"
                      className="mx-auto mb-3 flex flex-row-reverse justify-center bg-inherit text-center text-lg outline-none placeholder:text-gray-600"
                    />
                  </div>
                  {note.placeholder}
                  <button className="absolute bottom-0 flex w-full justify-center p-8 text-darkblue hover:opacity-50">
                    Add More Nodes +
                  </button>
                </div>
              </Draggable>
            ))}

            {imageList.map((image, index) => (
              <Draggable key={image.id} defaultPosition={{ x: 350, y: 550 }}>
                <div
                  className="absolute cursor-pointer shadow-boxshadow1"
                  id={`image-${image.id}`}
                  key={index}
                >
                  <div>
                    <div className="absolute flex w-full justify-end">
                      <NoteDropdown
                        onDelete={() => handleDeleteNote(image.id)}
                      />
                    </div>
                    <img
                      onClick={() => onImageUpdate(index)}
                      draggable={false}
                      src={image.data_url}
                      width="300"
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
