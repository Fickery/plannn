import { NotesState, NoteProps, SubNoteProps, iconProps } from "@/utils/types";
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
        x: payload.x,
        y: payload.y,
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

      // Duplicate main note
      const duplicatedNote: NoteProps = {
        ...noteToDuplicate,
        id: generateUniqueId(), // Generate new ID for the duplicated note
        subNotes: [], // Initialize an empty array for sub-notes of the duplicated note
      };

      // Duplicate sub-notes (if any)
      if (noteToDuplicate.subNotes) {
        console.log("Sub-notes to duplicate:", noteToDuplicate.subNotes);
        // Create copies of sub-notes and add them to the duplicated note
        duplicatedNote.subNotes = noteToDuplicate.subNotes.map((subNote) => ({
          ...subNote,
          id: generateUniqueId(), // Generate new ID for each duplicated sub-note
        }));
        console.log("Duplicated sub-notes:", duplicatedNote.subNotes);
      }

      state.notes.push(duplicatedNote);
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    deleteSubNote: (state, action: PayloadAction<string>) => {
      const subNoteId = action.payload;
      state.notes.forEach((note) => {
        if (note.subNotes) {
          note.subNotes = note.subNotes.filter(
            (subNote) => subNote.id !== subNoteId,
          );
        }
      });
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
          text: payload.text,
        };
        if (!noteToUpdate.subNotes) {
          noteToUpdate.subNotes = [];
        }
        noteToUpdate.subNotes.push(newSubNote);
      }
    },
    updateText: (state, action: PayloadAction<SubNoteProps>) => {
      const { id, text } = action.payload;
      const noteToUpdate = state.notes.find((note) => {
        note.subNotes?.some((subNote) => subNote.id === id);
      });
      if (noteToUpdate) {
        const subNoteIndex = noteToUpdate.subNotes.findIndex(
          (subNote) => subNote.id === id,
        );
        const updatedSubNotes = [...noteToUpdate.subNotes];
        updatedSubNotes[subNoteIndex] = {
          ...updatedSubNotes[subNoteIndex],
          text,
        };
        noteToUpdate.subNotes = updatedSubNotes;
      }
    },
    updateIcon: (state, action: PayloadAction<iconProps>) => {
      const { id, icon } = action.payload;
      const noteIndex = state.notes.findIndex(
        (note) => note.subNotes?.some((subNote) => subNote.id === id),
      );

      if (noteIndex !== -1) {
        const updatedNote = { ...state.notes[noteIndex] };
        const subNoteIndex = updatedNote.subNotes.findIndex(
          (subNote) => subNote.id === id,
        );

        if (subNoteIndex !== -1) {
          const updatedSubNotes = [...updatedNote.subNotes];
          updatedSubNotes[subNoteIndex] = {
            ...updatedSubNotes[subNoteIndex],
            icon,
          };

          updatedNote.subNotes = updatedSubNotes;
          const updatedNotes = [...state.notes];
          updatedNotes[noteIndex] = updatedNote;
          return {
            ...state,
            notes: updatedNotes,
          };
        }
      }
      return state;
    },
    updateNotePosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>,
    ) => {
      const { id, x, y } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.x = x;
        note.y = y;
      }
    },
    deleteNotesBySessionId: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(
        (note) => note.sessionId !== action.payload,
      );
    },
  },
});

export const {
  addNote,
  deleteNote,
  duplicateNote,
  updateNote,
  addSubNote,
  updateText,
  updateIcon,
  deleteSubNote,
  updateNotePosition,
  deleteNotesBySessionId,
} = noteSlice.actions;

export default noteSlice.reducer;
