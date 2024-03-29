import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Session, setCurrentSession } from "@/redux/reducers/sessionSlice";
import DeleteIcon from "../DeleteIcon";

const SessionDropdown = ({ handleDeleteSession }) => {
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const dispatch = useDispatch();

  const handleChangeSession = (sessionId: string) => {
    dispatch(setCurrentSession(sessionId));
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