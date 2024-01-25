import { duplicateNote } from "../actions/notesAction";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: [],
};
const generateUniqueId = () => {
  return uuidv4();
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_IMG":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            return {
              ...note,
              img: action.payload.img,
            };
          } else {
            return note;
          }
        }),
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case "DUPLICATE_NOTE":
      const noteToDuplicate = state.notes.find(
        (note) => note.id === action.payload,
      );

      if (!noteToDuplicate || typeof noteToDuplicate !== "object") {
        return state;
      }

      const duplicatedNote = {
        ...noteToDuplicate,
        id: generateUniqueId(),
      };

      return {
        ...state,
        notes: [...state.notes, duplicatedNote],
      };

    case "ADD_SUB_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            return {
              ...note,
              subNotes: [...note.subNotes, action.payload.subNote],
            };
          } else {
            return note;
          }
        }),
      };
    default:
      return state;
  }
};

export default notesReducer;
