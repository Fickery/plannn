const initialState = {
  notes: [],
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
