import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../reducers/notesSlice";

const store = configureStore({
  reducer: {
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
