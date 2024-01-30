import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface SubNoteProps {
  id: UniqueIdentifier;
  title: string;
  subNotes: SubNoteProps[];
}

export interface Note {
  id: UniqueIdentifier;
  title: string;
  // subNotes: SubNoteProps[];
}

interface State {
  notes: Note[];
}

const initialState: State = {
  notes: [],
};

const generateUniqueId = (): string => {
  return uuidv4();
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<UniqueIdentifier>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    duplicateNote: (state, action: PayloadAction<UniqueIdentifier>) => {
      const noteToDuplicate = state.notes.find(
        (note) => note.id === action.payload,
      );

      if (noteToDuplicate) {
        const duplicatedNote: Note = {
          ...noteToDuplicate,
          id: generateUniqueId(),
        };

        state.notes.push(duplicatedNote);
      }
    },
    // addSubNote: (
    //   state,
    //   action: PayloadAction<{ id: UniqueIdentifier; subNote: SubNoteProps }>,
    // ) => {
    //   const { id, subNote } = action.payload;
    //   const note = state.notes.find((note) => note.id === id);

    //   if (note) {
    //     note.subNotes.push(subNote);
    //   }
    // },
    // ... other reducers ...
  },
});

export const { addNote, deleteNote, duplicateNote } = notesSlice.actions;
export default notesSlice.reducer;
