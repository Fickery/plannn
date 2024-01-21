export const addNote = (note) => {
  return {
    type: "ADD_NOTE",
    payload: note,
  };
};

export const addImg = (id, img) => {
  return {
    type: "ADD_IMG",
    payload: { id, img },
  };
};

export const deleteNote = (id) => {
  return {
    type: "DELETE_NOTE",
    payload: id,
  };
};

export const addSubNote = (id, subNote) => {
  return {
    type: "ADD_SUB_NOTE",
    payload: { id, subNote },
  };
};

// Add more actions as necessary, like deleteNote, addSubNote, etc.
