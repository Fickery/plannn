const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    // case "DELETE_NOTE" or add sub nodes
    default:
      return state;
  }
};

export default notesReducer;
