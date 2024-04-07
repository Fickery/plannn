import { UniqueIdentifier } from "@dnd-kit/core";
import { NoteProps } from "@/redux/reducers/notesSlice";

export interface DeleteIconProps {
  handleDeleteSession: () => void;
}

export interface SessionDropdownProps {
  currentSessionId: string;
  handleDeleteSession: () => void;
  handleSessionChange: (sessionId: string) => void;
}

export type randomColorProps = {
  luminosity: "light" | "bright" | "dark" | "random" | undefined;
};

export type NoteProp = {
  id: UniqueIdentifier;
  title: string;
  color: string;
  placeholder: string;
};

export type AddBtnProps = {
  onImageUpload: (id: string) => void;
  handleAddNote: () => void;
};

export type NoteDropdownProps = {
  onDuplicate: () => void;
};

export interface NoteContProps {
  notes: NoteProps[];
  handleDuplicate: (id: string) => void;
  handleTitleChange: any;
  handleAddSubNote: (id: string) => void;
  handleSubNoteUpdate: (
    e: React.ChangeEvent<HTMLInputElement>,
    subNoteId: string,
  ) => void;
}

export type ImageDropdownArrowProps = {
  onImageUpdate: (index: number) => void;
  onImageRemove: (index: number) => void;
  index: number;
};
