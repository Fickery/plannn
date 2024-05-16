import { UniqueIdentifier } from "@dnd-kit/core";

export interface DeleteIconProps {
  handleDeleteSession: () => void;
}

export interface SessionDropdownProps {
  currSessionId: string;
  setCurrSessionId: (sessionId: string) => void;
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
  onImageUpload: () => void;
  handleAddNote: () => void;
  // handleAddImg: () => void;
};

export type NoteDropdownProps = {
  onDelete: () => void;
  onDuplicate: () => void;
};

export interface NoteContProps {
  notes: NoteProps[];
  handleDelete: (id: string) => void;
  handleDuplicate: (id: string) => void;
  handleTitleChange: any;
  handleAddSubNote: (id: string) => void;
  handleSubNoteUpdate: (
    e: React.ChangeEvent<HTMLInputElement>,
    subNoteId: string,
  ) => void;
  handleDeleteSubNote: (subNoteId: string) => void;
}

export type ImageDropdownArrowProps = {
  onImageUpdate: (index: number) => void;
  onImageRemove: (index: number) => void;
  index: number;
};

//noteslice

export type NoteProps = {
  id: string;
  name: number;
  title: string;
  color: string;
  sessionId: string | null;
  subNotes?: SubNoteProps[];
  x: number;
  y: number;
};

export type SubNoteProps = {
  id: string;
  text: string;
};

export type iconProps = {
  id: string;
  icon: string | null;
};

export type NotesState = {
  notes: NoteProps[];
};

//imageslice

export type ImageProps = {
  sessionId: string;
  // id: string;
  data_url: string;
};
