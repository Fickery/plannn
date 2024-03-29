import Delete from "../components/svgs/DeleteIcon";

export default function DeleteIcon({ handleDeleteSession }) {
  return (
    <div>
      <Delete handleDeleteSession={handleDeleteSession} />
    </div>
  );
}
