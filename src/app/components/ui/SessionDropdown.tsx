import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Session, setCurrentSession } from "@/redux/reducers/sessionSlice";

const SessionDropdown = () => {
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const dispatch = useDispatch();

  const handleChangeSession = (sessionId: string) => {
    dispatch(setCurrentSession(sessionId));
  };

  return (
    <div>
      <select
        className="w-fit"
        onChange={(e) => handleChangeSession(e.target.value)}
      >
        <option value="">Select a session</option>
        {sessions.map((session: Session) => (
          <option key={session.id} value={session.id}>
            {session.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SessionDropdown;
