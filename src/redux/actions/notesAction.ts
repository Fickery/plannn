export const addNote = (note) => {
  return {
    type: "ADD_NOTE",
    payload: note,
  };
};
// Add more actions as necessary, like deleteNote, addSubNote, etc.
