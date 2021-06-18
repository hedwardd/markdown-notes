export type Note = {
  title: string;
  body: string;
  creation_date: Date;
};

export type AppState = {
  notes: Note[];
  currentNoteIndex: number | null;
  isEditing: boolean;
  editorTitleText: string;
  editorBodyText: string;
};

export type Action =
  | { type: "OPEN_NOTE"; payload: number }
  | { type: "CLOSE_NOTE" }
  | { type: "CREATE_NOTE" }
  | { type: "DELETE_NOTE" }
  | { type: "START_EDIT" }
  | { type: "EDIT_TITLE"; payload: string }
  | { type: "EDIT_BODY"; payload: string }
  | { type: "SAVE_EDIT" }
  | { type: "CANCEL_EDIT" };
