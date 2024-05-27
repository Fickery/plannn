import {
  addSession,
  deleteSession,
  setCurrentSession,
} from "@/redux/reducers/sessionSlice";
import { deleteNotesBySessionId } from "@/redux/reducers/notesSlice";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import SessionDropdown from "./SessionDropdown";

export default function AddSession() {
  const [sessionName, setSessionName] = useState("");
  const [currSessionId, setCurrSessionId] = useState<string>("");

  const dispatch = useDispatch();
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const router = useRouter();

  const handleAddSession = () => {
    if (sessionName.trim() !== "") {
      const newSessionId = uuidv4();
      const newSession = {
        id: newSessionId,
        name: sessionName,
        noteIds: [],
      };
      dispatch(addSession(newSession));
      setSessionName("");
      setCurrSessionId(newSessionId);
      localStorage.setItem(
        "sessions",
        JSON.stringify([...sessions, newSession]),
      );
      dispatch(setCurrentSession(newSessionId));
      router.push(`/notes/${newSessionId}`);
    } else {
      alert("Please enter a session name.");
    }
  };

  const handleDeleteSession = () => {
    if (window.confirm(`Are you sure you want to delete this session?`)) {
      dispatch(deleteNotesBySessionId(currSessionId));
      dispatch(deleteSession(currSessionId));
      const updatedSessions = sessions.filter(
        (session) => session.id !== currSessionId,
      );
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));

      const nextSessionId = updatedSessions.length
        ? updatedSessions[0].id
        : null;
      dispatch(setCurrentSession(nextSessionId));
      setCurrSessionId(nextSessionId);
      router.push(nextSessionId ? `/notes/${nextSessionId}` : "/");
    }
  };

  const handleSessionChange = (selectedSessionId: string) => {
    setCurrSessionId(selectedSessionId);
  };

  return (
    <div className="flex items-center gap-2 rounded outline outline-1">
      <div className="flex h-full gap-2">
        <button
          className="text-md flex w-fit items-center rounded-l-none border-0 border-r border-solid border-darkblue bg-darkblue px-[0.35rem] text-darkblue text-white hover:bg-midblue hover:text-darkblue"
          onClick={handleAddSession}
        >
          +
        </button>
        <input
          className="mb-[0.15rem] border-0 border-r border-solid border-darkblue pt-1 text-xs"
          type="text"
          autoCorrect="off"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="add session..."
        />
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <SessionDropdown
          currSessionId={currSessionId}
          setCurrSessionId={setCurrSessionId}
          handleSessionChange={handleSessionChange}
          handleDeleteSession={handleDeleteSession}
        />
      </Suspense>
    </div>
  );
}
