import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type NoteProps = {
  id: string;
  name: string;
  title: string;
  color: string;
};

type NotesState = {
  notes: NoteProps[];
};

const generateUniqueId = () => {
  return uuidv4();
};

const initialState: NotesState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteProps>) => {
      const payload = action.payload;
      const newNote: NoteProps = {
        id: generateUniqueId(),
        name: payload.name,
        title: payload.title,
        color: payload.color,
      };
      state.notes.push(newNote);
    },
    duplicateNote: (state, action: PayloadAction<string>) => {
      const noteToDuplicate = state.notes.find(
        (note) => note.id === action.payload,
      );

      if (!noteToDuplicate || typeof noteToDuplicate !== "object") {
        return state;
      }

      const duplicatedNote: NoteProps = {
        ...noteToDuplicate,
        id: generateUniqueId(),
      };

      state.notes.push(duplicatedNote);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNote: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      const { id, title } = action.payload;
      const updatedNotes = state.notes.map((note) =>
        note.id === id ? { ...note, title } : note,
      );
      state.notes = updatedNotes;
    },
  },
});

export const { addNote, deleteNote, duplicateNote, updateNote } =
  noteSlice.actions;

export default noteSlice.reducer;
