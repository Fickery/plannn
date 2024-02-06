export const addNote = (note) => {
  return {
    type: "ADD_NOTE",
    payload: note,
  };
};

export const deleteNote = (id) => {
  return {
    type: "DELETE_NOTE",
    payload: id,
  };
};

export const duplicateNote = (id) => {
  return {
    type: "DUPLICATE_NOTE",
    payload: id,
  };
};

export const updateNote = (id, note) => {
  return {
    type: "UPDATE_NOTE",
    payload: { id, note },
  };
};

export const addSubNote = (id, subNote) => {
  return {
    type: "ADD_SUB_NOTE",
    payload: { id, subNote },
  };
};

// Add more actions as necessary, like deleteNote, addSubNote, etc.
