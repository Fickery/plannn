import sessionSlice, {
  addSession,
  deleteSession,
} from "@/redux/reducers/sessionSlice";
import { RootState } from "@/redux/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import SessionDropdown from "./SessionDropdown";

export default function AddSession() {
  const [sessionName, setSessionName] = useState("");

  const dispatch = useDispatch();
  const generateUniqueId = () => {
    return uuidv4();
  };

  const currentSessionId = useSelector(
    (state: RootState) => state.sessions.currentSessionId,
  );

  const handleAddSession = () => {
    if (sessionName.trim() !== "") {
      dispatch(
        addSession({ id: generateUniqueId(), name: sessionName, noteIds: [] }),
        setSessionName(""),
      );
    }
  };

  const handleDeleteSession = () => {
    const sessionToDelete = sessionName || "current session";
    if (window.confirm(`Are you sure you want to delete ${sessionToDelete}?`))
      dispatch(deleteSession(currentSessionId));
    console.log(`successfully deleted note ${currentSessionId}`);
  };

  return (
    <div className="flex items-center gap-2 outline outline-1">
      <div className="flex gap-2 outline outline-1">
        <button
          className="text-md flex w-fit items-center border-0 border-r border-solid border-darkblue bg-white px-[0.35rem] text-darkblue hover:bg-midblue hover:text-darkblue"
          onClick={handleAddSession}
        >
          +
        </button>
        <input
          className="mb-[0.15rem] pt-1 text-xs"
          type="text"
          autoCorrect="off"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="add session..."
        />
      </div>
      <SessionDropdown />
      <p
        className="cursor-pointer text-red-500 outline outline-1 hover:text-midblue"
        onClick={handleDeleteSession}
      >
        D
      </p>
    </div>
  );
}
