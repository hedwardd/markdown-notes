import React, { useEffect, useReducer } from "react";

import "./App.css";
import reducer from "./reducer";
import { AppState, Note } from "./types";
import List from "./views/List";
import NoteView from "./views/NoteView/NoteView";

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
      <header>
        <h1>Notes App</h1>
      </header>

      {currentNoteIndex === null ? (
        <List state={state} dispatch={dispatch} />
      ) : (
        <NoteView state={state} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
