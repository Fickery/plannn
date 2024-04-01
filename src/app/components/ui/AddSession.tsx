import {
  addSession,
  deleteSession,
  setCurrentSession,
} from "@/redux/reducers/sessionSlice";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SessionDropdown from "./SessionDropdown";
import { v4 as uuidv4 } from "uuid";

export default function AddSession() {
  const [sessionName, setSessionName] = useState("");
  const [isTitleInput, setIsTitleInput] = useState(false);
  const [currSessionId, setCurrSessionId] = useState("");
  const dispatch = useDispatch();
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const currentSessionId = useSelector(
    (state: RootState) => state.sessions.currentSessionId,
  );

  const UniqueId = () => {
    return uuidv4();
  };
  const router = useRouter();

  useEffect(() => {
    setCurrSessionId(currentSessionId);
  }, [currSessionId]);

  useEffect(() => {
    const savedSessions = localStorage.getItem("sessions");
    if (savedSessions) {
      dispatch(addSession(JSON.parse(savedSessions)));
    }
  }, []);

  const handleAddSession = () => {
    if (sessionName.trim() !== "") {
      const newSessionId = UniqueId();
      dispatch(
        addSession({ id: newSessionId, name: sessionName, noteIds: [] }),
      );
      dispatch(setCurrentSession(newSessionId));
      router.push(`/notes/${newSessionId}`);
      setCurrSessionId(newSessionId);
      setSessionName("");
      setIsTitleInput(false);
    } else {
      alert("Please enter a session name.");
    }
  };

  const handleDeleteSession = () => {
    if (window.confirm(`Are you sure you want to delete this session?`))
      dispatch(deleteSession(currentSessionId));
    console.log(`successfully deleted note ${currentSessionId}`);
  };

  const handleSessionChange = (sessionId: string) => {
    setCurrSessionId(sessionId);
  };

  const getSession = () => {
    localStorage.getItem("sessions");
    console.log("all saved sessions", sessions);
  };

  const handleClearAllSession = () => {
    localStorage.removeItem("sessions");
    console.log("all saved sessions cleared");
  };

  return (
    <div className="flex items-center gap-2 outline outline-1">
      <button className="p-3 text-xs" onClick={getSession}>
        getSession
      </button>
      <button className="p-3 text-xs" onClick={handleClearAllSession}>
        clear local saved
      </button>
      <div className="flex h-full gap-2">
        <button
          className="text-md flex w-fit items-center border-0 border-r border-solid border-darkblue bg-darkblue px-[0.35rem] text-darkblue text-white hover:bg-midblue hover:text-darkblue"
          onClick={() => handleAddSession(sessionName)}
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
      <SessionDropdown
        currSessionId={currSessionId}
        handleSessionChange={handleSessionChange}
        handleDeleteSession={handleDeleteSession}
      />
    </div>
  );
}

// useEffect(() => {
//   saveSessionsToLocalStorage();
// }, [sessions]); // Only run when sessions change

// const saveSessionsToLocalStorage = () => {
//   const sessionsJSON = JSON.stringify(sessions);
//   localStorage.setItem("sessions", sessionsJSON);
// };
