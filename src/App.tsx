import React, { useEffect, useReducer } from "react";
import marked from "marked";

import "./App.css";
import reducer from "./reducer";
import { AppState, Note } from "./types";
import List from "./components/List";
import Editor from "./components/Editor";
import Viewer from "./components/Viewer";

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

  const { notes, currentNoteIndex, isEditing } = state;

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const editHandler = (type: "title" | "body") => {
    const actionType = type === "title" ? "EDIT_TITLE" : "EDIT_BODY";
    return function (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      dispatch({ type: actionType, payload: e.target.value });
    };
  };

  return (
    <div className="App">
      {currentNoteIndex === null ? (
        <List state={state} dispatch={dispatch} />
      ) : (
        <div className="note-container">
          {isEditing ? (
            <Editor
              state={state}
              dispatch={dispatch}
              editHandler={editHandler}
            />
          ) : (
            <Viewer state={state} dispatch={dispatch} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
