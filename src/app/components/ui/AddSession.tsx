import { addSession, deleteSession } from "@/redux/reducers/sessionSlice";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import SessionDropdown from "./SessionDropdown";

export default function AddSession() {
  const [sessionName, setSessionName] = useState("");
  const [currSessionId, setCurrSessionId] = useState<string>("");

  const dispatch = useDispatch();
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const currentSessionId = useSelector(
    (state: RootState) => state.sessions.currentSessionId,
  );

  const router = useRouter();
  const UniqueId = () => {
    return uuidv4();
  };

  const handleAddSession = () => {
    if (sessionName.trim() !== "") {
      const newSessionId = UniqueId();
      dispatch(
        addSession({ id: newSessionId, name: sessionName, noteIds: [] }),
      );
      setSessionName("");
      setCurrSessionId(newSessionId);
      console.log("CurrSessionId:", newSessionId);

      localStorage.setItem("sessions", JSON.stringify(sessions));
      router.push(`/notes/${newSessionId}`);
    } else {
      alert("Please enter a session name.");
    }
  };

  const handleDeleteSession = () => {
    if (window.confirm(`Are you sure you want to delete this session?`)) {
      const currentIndex = sessions.findIndex(
        (session) => session.id === currSessionId,
      );
      dispatch(deleteSession(currSessionId));
      const nextSessionId =
        currentIndex < sessions.length - 1
          ? sessions[currentIndex + 1].id
          : currentIndex > 0
            ? sessions[currentIndex - 1].id
            : "";
      setCurrSessionId(nextSessionId);
      router.push(`/notes/${nextSessionId}`);
    }
    console.log(`successfully deleted note ${currSessionId}`);
  };

  const handleSessionChange = (selectedSessionId: string) => {
    setCurrSessionId(selectedSessionId);
  };

  return (
    <div className="flex items-center gap-2 outline outline-1">
      <div className="flex h-full gap-2">
        <button
          className="text-md flex w-fit items-center border-0 border-r border-solid border-darkblue bg-darkblue px-[0.35rem] text-darkblue text-white hover:bg-midblue hover:text-darkblue"
          onClick={() => handleAddSession()}
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
      <Suspense fallback={<p>dkds</p>}>
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
