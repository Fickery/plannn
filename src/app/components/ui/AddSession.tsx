import { addSession } from "@/redux/reducers/sessionSlice";
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

  const notes = useSelector((state: RootState) => state.notes.notes);
  const currentSessionId = useSelector(
    (state: RootState) => state.sessions.currentSessionId,
  );
  const currentSession = useSelector(
    (state: RootState) => state.sessions.sessions,
  ).find((session) => session.id === currentSessionId);

  const handleAddSession = () => {
    if (sessionName.trim() !== "") {
      dispatch(
        addSession({ id: generateUniqueId(), name: sessionName, noteIds: [] }),
        setSessionName(""),
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="text-md flex w-fit items-center bg-darkblue px-[0.40rem] py-[0.2rem] text-white hover:bg-midblue hover:text-darkblue"
        onClick={handleAddSession}
      >
        +
      </button>
      <input
        className="text-xs"
        type="text"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        placeholder="new session..."
      />
      <SessionDropdown />
    </div>
  );
}
