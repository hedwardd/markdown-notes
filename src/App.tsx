import React, { useEffect, useReducer } from "react";

import "./App.css";
import reducer from "./reducer";
import { AppState, Note } from "./types";
import ListView from "./views/ListView";
import NoteView from "./views/NoteView";

const storedNotesString = localStorage.getItem("notes");
const parsedStoredNotes: Note[] = storedNotesString
  ? JSON.parse(storedNotesString)
  : [];

const initialState: AppState = {
  notes: parsedStoredNotes,
  currentNoteIndex: null,
  isEditing: false,
  editorTitleText: "",
  editorBodyText: "",
};

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { notes, currentNoteIndex } = state;

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <header className="header">
        <h1>Markdown Notes</h1>
      </header>

      {currentNoteIndex === null ? (
        <ListView state={state} dispatch={dispatch} />
      ) : (
        <NoteView state={state} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
