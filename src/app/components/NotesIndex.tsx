import {
  addImageToSession,
  addNoteToSession,
} from "@/redux/reducers/sessionSlice";
import { RootState } from "@/redux/store/store";
import { randomColorProps } from "@/utils/types";
import randomColor from "randomcolor";
import { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addNote,
  addSubNote,
  deleteNote,
  deleteSubNote,
  duplicateNote,
  updateNote,
  updateText,
} from "../../redux/reducers/notesSlice";
import ImageCont from "./ImageCont";
import NoteCont from "./NoteCont";
import AddBtn from "./ui/AddBtn";

const generateUniqueId = () => {
  return uuidv4();
};

export default function NotesIndex() {
  const [images, setImages] = useState([]);

  const notes = useSelector((state: RootState) => state.notes.notes);
  const currentSessionId = useSelector(
    (state: RootState) => state.sessions.currentSessionId,
  );
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const imagesState = useSelector((state: RootState) => state.images.images);

  const sessionNotes = notes.filter(
    (note) => note.sessionId === currentSessionId,
  );
  const sessionImages = imagesState.filter(
    (image) => image.sessionId === currentSessionId,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSessionId) {
      const currentSession = sessions.find(
        (session) => session.id === currentSessionId,
      );
      console.log("Current Session Details:", currentSession);
      console.log("Notes in Current Session:", sessionNotes);
      console.log("Images in Current Session:", sessionImages);
    }
  }, [currentSessionId, sessions, sessionNotes, sessionImages]);

  const param: randomColorProps = {
    luminosity: "light",
  };

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
    dispatch(updateText({ id: subNoteId, text: updatedSubNote }));
  };

  const handleAddImg = (imageList: any) => {
    setImages(imageList);
    if (currentSessionId) {
      const newImageId = generateUniqueId();
      dispatch(
        addImageToSession({ sessionId: currentSessionId, imageId: newImageId }),
      );
    }
    console.log(sessionImages);
  };

  const handleAddNote = () => {
    const randPos = () => {
      const randX = Math.random() * (window.innerWidth - 300);
      const randY = Math.random() * (window.innerHeight - 225);
      return { x: randX, y: randY };
    };

    const newNote = {
      id: generateUniqueId(),
      name: notes.length + 1,
      title: "",
      color: randomColor(param),
      sessionId: currentSessionId,
      subNotes: [],
      ...randPos(),
    };

    dispatch(addNote(newNote));
    console.log(`successfully added note ${newNote.name}`);
    dispatch(
      addNoteToSession({ sessionId: currentSessionId, noteId: newNote.id }),
    );
  };

  const handleAddSubNote = (noteId: string) => {
    const newSubNote = {
      id: generateUniqueId(),
      noteId: noteId,
      icon: "",
      text: "",
    };
    dispatch(addSubNote(newSubNote));
    console.log(noteId);
  };

  const handleDuplicate = (noteId: string) => {
    dispatch(duplicateNote(noteId));
  };

  const handleDelete = (noteId: string) => {
    dispatch(deleteNote(noteId));
    console.log("delete note");
  };

  const handleDeleteSubNote = (subNoteId: string) => {
    dispatch(deleteSubNote(subNoteId));
    console.log("delete subnote");
  };

  return (
    <div className="main-container">
      {currentSessionId ? (
        <>
          <ImageUploading
            multiple
            value={images}
            onChange={(imageList) => handleAddImg(imageList)}
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
                  handleDelete={handleDelete}
                  handleDuplicate={handleDuplicate}
                  handleTitleChange={handleTitleChange}
                  handleAddSubNote={handleAddSubNote}
                  handleSubNoteUpdate={handleSubNoteUpdate}
                  handleDeleteSubNote={handleDeleteSubNote}
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
              <p className="animate-bounce">Please create a session</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
