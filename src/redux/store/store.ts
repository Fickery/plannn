import { combineReducers, createStore } from "redux";
import notesReducer from "../reducers/notesReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
});

const store = createStore(rootReducer);

export default store;
