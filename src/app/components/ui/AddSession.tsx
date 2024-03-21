import { addSession } from "@/redux/reducers/sessionSlice";
import { RootState } from "@/redux/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

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
    <div className="flex gap-2">
      <button
        className="w-fit bg-darkblue p-3 text-xs text-white hover:bg-midblue"
        onClick={handleAddSession}
      >
        add session
      </button>
      <input
        className="text-sm"
        type="text"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        placeholder="Enter session name"
      />
    </div>
  );
}
