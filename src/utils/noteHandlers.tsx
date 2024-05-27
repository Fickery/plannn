import { useDispatch } from "react-redux";
import { addSubNote } from "../redux/reducers/notesSlice";

export const handleAddSubNote = (noteId) => {
  const dispatch = useDispatch();
  dispatch(addSubNote({ id: noteId }));
};
