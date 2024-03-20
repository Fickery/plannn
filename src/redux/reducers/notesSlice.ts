import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type SubNoteProps = {
  id: string;
  icon: string;
  text: string;
};

export type NoteProps = {
  id: string;
  name: string;
  title: string;
  color: string;
  subNotes?: SubNoteProps[];
};

type SessionProps = {
  id: string;
  title: string;
  notes: NoteProps[];
};

type NotesState = {
  sessions: SessionProps[];
};

const generateUniqueId = () => {
  return uuidv4();
};

const initialState: NotesState = {
  sessions: [],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<SessionProps>) => {
      const payload = action.payload;
      const newSession: SessionProps = {
        id: generateUniqueId(),
        title: `Session ${state.sessions.length + 1}`,
        notes: [],
      };
      state.sessions.push(newSession);
    },
    addNote: (
      state,
      action: PayloadAction<{ sessionId: string; note: NoteProps }>,
    ) => {
      const { sessionId, note } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        session.notes.push(note);
      }
    },
    duplicateNote: (state, action: PayloadAction<string>) => {
      const noteIdToDuplicate = action.payload;
      const session = state.sessions.find(
        (session) => session.id === noteIdToDuplicate,
      );

      if (!session) {
        return state;
      }

      const noteToDupe = session.notes?.find(
        (note) => note.id === noteIdToDuplicate,
      );

      if (!noteToDupe) {
        return state;
      }

      const duplicatedNote: NoteProps = {
        ...noteToDupe,
        id: generateUniqueId(),
        subNotes: noteToDupe.subNotes
          ? noteToDupe.subNotes.map((subNote) => ({
              ...subNote,
              id: generateUniqueId(),
            }))
          : [],
      };
      session.notes?.push(duplicatedNote);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.sessions = state.sessions.filter(
        (note) => note.id !== action.payload,
      );
    },
    updateNote: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      const { id, title } = action.payload;
      const updatedNotes = state.sessions.map((note) =>
        note.id === id ? { ...note, title } : note,
      );
      state.sessions = updatedNotes;
    },
    addSubNote: (
      state,
      action: PayloadAction<{
        sessionId: string;
        noteId: string;
        subNote: SubNoteProps;
      }>,
    ) => {
      const { sessionId, noteId, subNote } = action.payload;

      const session = state.sessions.find(
        (session) => session.id === sessionId,
      );

      if (session) {
        const noteToUpdate = session.notes?.find((note) => note.id === noteId);

        if (noteToUpdate) {
          const newSubNote: SubNoteProps = {
            id: generateUniqueId(),
            icon: subNote.icon,
            text: subNote.text,
          };

          const updatedNote = {
            ...noteToUpdate,
            subNotes: [...(noteToUpdate.subNotes || []), newSubNote],
          };

          const updatedSession = {
            ...session,
            notes: session.notes?.map((note) =>
              note.id === noteId ? updatedNote : note,
            ),
          };
          state.sessions = state.sessions.map((s) =>
            s.id === sessionId ? updatedSession : s,
          );

          // if (!noteToUpdate.subNotes) {
          //   noteToUpdate.subNotes = [];
          // }
          // noteToUpdate.subNotes.push(newSubNote);
        }
      }
    },
    updateSubNoteText: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const { id, text } = action.payload;
      for (const session of state.sessions) {
        for (const note of session.notes || []) {
          const subNoteToUpdate = note.subNotes?.find(
            (subNote) => subNote.id === id,
          );
          if (subNoteToUpdate) {
            subNoteToUpdate.text = text;
            break; // Exit loop once sub-note is found and updated
          }
        }
      }
    },
  },
});

export const {
  addSession,
  addNote,
  deleteNote,
  duplicateNote,
  updateNote,
  addSubNote,
  updateSubNoteText,
} = noteSlice.actions;

export default noteSlice.reducer;
