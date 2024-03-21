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
    deleteSession(state, action: PayloadAction<string>) {
      state.sessions = state.sessions.filter(
        (session) => session.id !== action.payload,
      );
    },
    setCurrentSession(state, action: PayloadAction<string>) {
      state.currentSessionId = action.payload;
    },
  },
});

export const { addSession, deleteSession, setCurrentSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
