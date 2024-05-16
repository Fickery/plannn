// src/redux/reducers/sessionSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Session {
  id: string;
  name: string;
  noteIds: string[];
  imageIds: string[];
}

interface SessionState {
  sessions: Session[];
  currentSessionId: string | null;
  images: [];
}

const initialState: SessionState = {
  sessions: [],
  currentSessionId: null,
  images: [],
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession(state, action: PayloadAction<Session>) {
      state.sessions.push(action.payload);
    },
    deleteSession(state, action: PayloadAction<string>) {
      if (state.sessions.length === 1) {
        state.sessions = [];
        state.currentSessionId = null;
      } else {
        state.sessions = state.sessions.filter(
          (session) => session.id !== action.payload,
        );
      }
    },
    setCurrentSession(state, action: PayloadAction<string>) {
      state.currentSessionId = action.payload;
    },
    addNoteToSession(
      state,
      action: PayloadAction<{ sessionId: string | null; noteId: string }>,
    ) {
      const session = state.sessions.find(
        (session) => session.id === action.payload.sessionId,
      );
      if (session) {
        session.noteIds.push(action.payload.noteId);
      }
    },
    addImageToSession(
      state,
      action: PayloadAction<{ sessionId: string | null; imageId: string }>,
    ) {
      const session = state.sessions.find(
        (session) => session.id === action.payload.sessionId,
      );
      if (session) {
        session.imageIds.push(action.payload.imageId);

        // Optionally, you can also update the imagesSlice here
        const existingImage = state.images.find(
          (image) => image.id === action.payload.imageId,
        );
        if (!existingImage) {
          state.images.push({
            id: action.payload.imageId,
            data_url: "your_image_data_here",
          });
        }
      }
    },
  },
});

export const {
  addSession,
  deleteSession,
  setCurrentSession,
  addNoteToSession,
  addImageToSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
