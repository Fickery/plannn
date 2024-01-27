import { combineReducers, createStore } from "redux";
import imagesReducer from "../reducers/imagesReducer";
import notesReducer from "../reducers/notesReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  images: imagesReducer,
});

const store = createStore(rootReducer);

export default store;
