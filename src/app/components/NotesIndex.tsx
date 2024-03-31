import useDragger from "@/hooks/useDragger";
import { addNoteToSession } from "@/redux/reducers/sessionSlice";
import { RootState } from "@/redux/store/store";
import { UniqueIdentifier } from "@dnd-kit/core";
import randomColor from "randomcolor";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addNote,
  addSubNote,
  duplicateNote,
  updateNote,
  updateSubNoteText,
} from "../../redux/reducers/notesSlice";
import ImageCont from "./ImageCont";
import NoteCont from "./NoteCont";
import AddBtn from "./ui/AddBtn";
import AddSession from "./ui/AddSession";

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

  const currentSessionId = useSelector(
    (state: RootState) => state.sessions.currentSessionId,
  );
  const notes = useSelector((state: RootState) => state.notes.notes);
  const sessions = useSelector((state: RootState) => state.sessions.sessions);

  const dispatch = useDispatch();
  const param: randomColorProps = {
    luminosity: "light",
  };

  const sessionNotes = notes.filter(
    (note) => note.sessionId === currentSessionId,
  );

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    noteId: string,
  ) => {
    const updatedTitle = e.target.value;
    dispatch(updateNote({ id: noteId, title: updatedTitle }));
  };

  const handleSubNoteUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    subNoteId: string,
  ) => {
    const updatedSubNote = e.target.value;
    dispatch(updateSubNoteText({ id: subNoteId, text: updatedSubNote }));
  };

  const handleAddNote = () => {
    const newNote = {
      id: generateUniqueId(),
      name: notes.length + 1,
      title: "",
      color: randomColor(param),
      sessionId: currentSessionId,
      subNotes: [],
    };
    dispatch(addNote(newNote));
    console.log(`successfully added note ${newNote.name}`);
    dispatch(
      addNoteToSession({ sessionId: currentSessionId, noteId: newNote.id }),
    );
  };

  const handleAddSubNote = (noteId: string) => {
    dispatch(
      addSubNote({
        id: noteId,
        icon: "",
        text: "",
      }),
    );
  };

  const handleDuplicate = (noteId: string) => {
    dispatch(duplicateNote(noteId));
  };

  const handleAddImg = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };

  useDragger("addBtn");

  const handleLogAllSession = () => {
    console.log("All Session:", sessions);
  };

  return (
    <div className="main-container">
      {/* <AddSession /> */}
      {currentSessionId ? (
        <>
          <button
            onClick={handleLogAllSession}
            className="mt-4 w-full rounded-md bg-gray-200 p-2"
          >
            Log All Session
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
                  notes={sessionNotes}
                  handleDuplicate={handleDuplicate}
                  handleTitleChange={handleTitleChange}
                  handleAddSubNote={handleAddSubNote}
                  handleSubNoteUpdate={handleSubNoteUpdate}
                  // handleRedirect={handleRedirect} // Pass handleRedirect function as a prop to NoteCont
                />
                <ImageCont
                  imageList={imageList}
                  onImageRemove={onImageRemove}
                  onImageUpdate={onImageUpdate}
                />
              </div>
            )}
          </ImageUploading>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div>
            <div className="w-fit cursor-default bg-slate-50 px-20 py-10 text-darkblue outline outline-1 outline-darkblue">
              Please create a session
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
