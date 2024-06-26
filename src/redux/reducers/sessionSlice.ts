import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Session {
  id: string;
  name: string;
  noteIds: string[];
}

interface SessionState {
  sessions: Session[];
  currentSessionId: string | null;
}

const initialState: SessionState = {
  sessions: [],
  currentSessionId: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession(state, action: PayloadAction<Session>) {
      state.sessions.push(action.payload);
    },
    deleteSession: (state, action: PayloadAction<string>) => {
      state.sessions = state.sessions.filter(
        (session) => session.id !== action.payload,
      );
      if (state.currentSessionId === action.payload) {
        state.currentSessionId =
          state.sessions.length > 0 ? state.sessions[0].id : null;
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
  },
});

export const {
  addSession,
  deleteSession,
  setCurrentSession,
  addNoteToSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
