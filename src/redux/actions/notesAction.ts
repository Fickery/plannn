type Note = {
  id: number;
  title: string;
  description: string;
  subNotes: Array<SubNote>;
};

type Session = {
  id: number;
  title: string;
  notes: Array<Note>;
};
}

type SubNote = {
  id: number;
  title: string;
  description: string;
};

export const addSession = (session: Session) => {
  return {
    type: "ADD_SESSION",
    payload: session,
  };
};

export const addNote = (note: Note) => {
  return {
    type: "ADD_NOTE",
    payload: note,
  };
};

export const deleteNote = (id: Number) => {
  return {
    type: "DELETE_NOTE",
    payload: id,
  };
};

export const duplicateNote = (id: Number) => {
  return {
    type: "DUPLICATE_NOTE",
    payload: id,
  };
};

export const updateNote = (id: Number, note: Note) => {
  return {
    type: "UPDATE_NOTE",
    payload: { id, note },
  };
};

export const addSubNote = (id: Number, subNote: SubNote) => {
  return {
    type: "ADD_SUB_NOTE",
    payload: { id, subNote },
  };
};

export const updateSubNote = (id: Number, subNote: SubNote) => {
  return {
    type: "UPDATE_SUB_NOTE",
    payload: { id, subNote },
  };
};
