import { Session, setCurrentSession } from "@/redux/reducers/sessionSlice";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "./DeleteIcon";
import { SessionDropdownProps } from "@/utils/types";

const SessionDropdown = ({
  currSessionId,
  setCurrSessionId,
  handleDeleteSession,
  handleSessionChange,
}: SessionDropdownProps) => {
  const sessions = useSelector((state: RootState) => state.sessions.sessions);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setCurrSessionId(currSessionId);
  }, [currSessionId]);

  useEffect(() => {
    if (sessions.length === 0) {
      router.push("/");
    }
  });

  const handleChangeSession = (selectedSessionId: string) => {
    dispatch(setCurrentSession(selectedSessionId));
    handleSessionChange(selectedSessionId);
    router.push(`/notes/${selectedSessionId}`);
    console.log("session changed" + selectedSessionId);
  };

  return (
    <div className="flex w-auto items-center gap-3">
      {sessions.length === 0 ? (
        <span className="cursor-default text-xs text-red-500">
          No session created
        </span>
      ) : (
        <select
          className="w-fit cursor-pointer hover:text-midblue"
          onChange={(e) => handleChangeSession(e.target.value)}
          value={currSessionId || ""}
        >
          {sessions.map((session: Session) => (
            <option key={session.id} value={session.id}>
              {session.name}
            </option>
          ))}
        </select>
      )}
      <DeleteIcon handleDeleteSession={handleDeleteSession} />
    </div>
  );
};

export default SessionDropdown;
