import { UniqueIdentifier } from "@dnd-kit/core";
import { Note, SubNote } from "../reducers/notesReducer";

export const addNote = (note: Note) => {
  return {
    type: "ADD_NOTE",
    payload: note,
  };
};

export const deleteNote = (id: UniqueIdentifier) => {
  return {
    type: "DELETE_NOTE",
    payload: id,
  };
};

export const duplicateNote = (id: UniqueIdentifier) => {
  return {
    type: "DUPLICATE_NOTE",
    payload: id,
  };
};

export const addSubNote = (id: UniqueIdentifier, subNote: SubNote) => {
  return {
    type: "ADD_SUB_NOTE",
    payload: { id, subNote },
  };
};
