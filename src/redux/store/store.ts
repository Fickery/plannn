import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../reducers/notesSlice";
import sessionSlice from "../reducers/sessionSlice";

const store = configureStore({
  reducer: {
    sessions: sessionSlice,
    notes: notesSlice,
  },
});

export default store;

// import { combineReducers, createStore } from "redux";
// import notesReducer from "../reducers/notesSlice";

// const rootReducer = combineReducers({
//   notes: notesReducer,
// });

// const store = createStore(rootReducer);

// export default store;
