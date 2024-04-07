import { DeleteIconProps } from "@/utils/types";
import Delete from "../svgs/DeleteIcon";

export default function DeleteIcon({ handleDeleteSession }: DeleteIconProps) {
  return (
    <div>
      <Delete handleDeleteSession={handleDeleteSession} />
    </div>
  );
}
