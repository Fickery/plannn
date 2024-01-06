import { createStore, combineReducers } from "redux";
import notesReducer from "../reducers/notesReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  // ... you can add other reducers here later on
});

const store = createStore(rootReducer);

export default store;
