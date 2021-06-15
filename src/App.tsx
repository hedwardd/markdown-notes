import React, { useState, useReducer } from 'react';

import './App.css';
import reducer from "./reducer";
import NoteEditor from "./NoteEditor";

const initialState = {
  notes: [],
  currentNoteIndex: null,
  isEditing: false,
  editorText: null,
}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editorText, setEditorText] = useState(state.notes[state.currentNoteIndex] || '');

  function handleEditorChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setEditorText(e.target.value);
  }

  function handleSave(e: React.UIEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch({type: 'SAVE_NOTE', payload: editorText});
  }

  return (
    <div className="App">
      <header>
        <h1>Notes App</h1>
      </header>
      <nav>
        <h2>All Notes</h2>
        <button onClick={() => dispatch({ type: 'CREATE_NOTE' })}>New</button>
        <ul>
          {state.notes.map((note, i) => (
            <li
              onClick={() => dispatch({ type: 'OPEN_NOTE', payload: i })}
            >
              {note}
            </li>
          ))}
        </ul>
      </nav>
      <h3>Current</h3>
      {state.isEditing ? (
        <>
          <NoteEditor editorText={editorText} handleEdit={handleEditorChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <button
            onClick={() => dispatch({type: 'EDIT_CURRENT_NOTE'})}
          >
            Edit
          </button>
          <p>
            {state.notes[state.currentNoteIndex]}
          </p>
        </>
      )}
    </div>
  );
}

export default App;
