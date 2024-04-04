export const saveSessionsToLocalStorage = (sessions) => {
  localStorage.setItem("sessions", JSON.stringify(sessions));
};

export const getSessionsFromLocalStorage = () => {
  const sessions = localStorage.getItem("sessions");
  return sessions ? JSON.parse(sessions) : [];
};

export const saveNotesToLocalStorage = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const getNotesFromLocalStorage = () => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};
