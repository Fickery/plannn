import { NotesState, NoteProps, SubNoteProps } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
        id: payload.id,
        name: payload.name,
        title: payload.title,
        color: payload.color,
        sessionId: payload.sessionId,
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
        subNotes: noteToDuplicate.subNotes
          ? noteToDuplicate.subNotes.map((subNote) => ({
              ...subNote,
              id: generateUniqueId(),
            }))
          : [],
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
    addSubNote: (state, action: PayloadAction<SubNoteProps>) => {
      const { id } = action.payload;

      const noteToUpdate = state.notes.find((note) => note.id === id);

      if (noteToUpdate) {
        const payload = action.payload;
        const newSubNote: SubNoteProps = {
          id: generateUniqueId(),
          icon: payload.icon,
          text: payload.text,
        };
        if (!noteToUpdate.subNotes) {
          noteToUpdate.subNotes = [];
        }
        noteToUpdate.subNotes.push(newSubNote);
      }
    },
    updateSubNoteText: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const { id, text } = action.payload;
      const updatedSubNotes = state.notes.map((note) =>
        note.id === id ? { ...note, text } : note,
      );
      state.notes = updatedSubNotes;
    },
  },
});

export const {
  addNote,
  deleteNote,
  duplicateNote,
  updateNote,
  addSubNote,
  updateSubNoteText,
} = noteSlice.actions;

export default noteSlice.reducer;

// updateNotePosition: (
//   state,
//   action: PayloadAction<{ id: string; x: number; y: number }>,
// ) => {
//   const { id, x, y } = action.payload;
//   const note = state.notes.find((note) => note.id === id);
//   if (note) {
//     note.x = x;
//     note.y = y;
//   }
// },
