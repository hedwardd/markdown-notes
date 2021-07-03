import DOMPurify from "dompurify";

import { Action, Note, AppState } from "./types";

const createNewNote = (): Note => ({
  title: "Untitled Note",
  body: "",
  creation_date: new Date(),
});

const reducer = (state: AppState, action: Action): AppState => {
  const { notes, currentNoteIndex, editorTitleText, editorBodyText } = state;
  switch (action.type) {
    case "OPEN_NOTE":
      return {
        ...state,
        currentNoteIndex: action.payload,
      };
    case "CLOSE_NOTE":
      return {
        ...state,
        currentNoteIndex: null,
      };
    case "CREATE_NOTE": {
      const newNote = createNewNote();
      return {
        ...state,
        notes: [...notes, newNote],
        isEditing: true,
        currentNoteIndex: notes.length,
        editorTitleText: newNote.title,
        editorBodyText: newNote.body,
      };
    }
    case "DELETE_NOTE":
      return {
        ...state,
        isEditing: false,
        notes: [
          ...notes.slice(0, currentNoteIndex!),
          ...notes.slice(currentNoteIndex! + 1),
        ],
        currentNoteIndex: null,
      };
    case "START_EDIT":
      return {
        ...state,
        isEditing: true,
        editorTitleText: notes[currentNoteIndex!].title,
        editorBodyText: notes[currentNoteIndex!].body,
      };
    case "EDIT_TITLE":
      return {
        ...state,
        editorTitleText: action.payload,
      };
    case "EDIT_BODY":
      return {
        ...state,
        editorBodyText: action.payload,
      };
    case "SAVE_EDIT": {
      const updatedNote: Note = {
        ...notes[currentNoteIndex!],
        title: editorTitleText,
        body: DOMPurify.sanitize(editorBodyText),
      };
      return {
        ...state,
        isEditing: false,
        notes: [
          ...notes.slice(0, currentNoteIndex!),
          updatedNote,
          ...notes.slice(currentNoteIndex! + 1),
        ],
      };
    }
    case "CANCEL_EDIT":
      return {
        ...state,
        isEditing: false,
      };
    default:
      throw new Error();
  }
};

export default reducer;
