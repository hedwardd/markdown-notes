import React, { useEffect, useReducer, useState } from 'react';

import './App.css';
import reducer from "./reducer";
import NoteEditor from "./NoteEditor";

const storedNotesString = localStorage.getItem('notes');
const parsedStoredNotes: string[] = storedNotesString ? JSON.parse(storedNotesString) : [];

const initialState = {
  notes: parsedStoredNotes,
  currentNoteIndex: null,
  isEditing: false,
}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editorText, setEditorText] = useState(state.notes[state.currentNoteIndex] || '');
  
    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(state.notes));
    }, [state.notes]);

  function handleCreateButton() {
    setEditorText('');
    dispatch({ type: 'CREATE_NOTE' });
  }

  function handleEditButton() {
    setEditorText(state.notes[state.currentNoteIndex]);
    dispatch({type: 'EDIT_CURRENT_NOTE'});
  }

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
        <button onClick={handleCreateButton}>New</button>
        {state.notes.length ? (
        <ul>
          {state.notes.map((note, i) => (
            <li
              onClick={() => dispatch({ type: 'OPEN_NOTE', payload: i })}
            >
              {note}
            </li>
          ))}
        </ul>
        ): (
          <p>Add your first note!</p>
        )}
      </nav>
      {state.currentNoteIndex !== null ? (
        <div>
          <h3>Current</h3>
          {state.isEditing ? (
            <>
              <NoteEditor editorText={editorText} handleEdit={handleEditorChange} />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditButton}
              >
                Edit
              </button>
              <button
                onClick={() => dispatch({type: 'DELETE_NOTE'})}
              >
                Delete
              </button>
              <p>
                {state.notes[state.currentNoteIndex]}
              </p>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default App;
