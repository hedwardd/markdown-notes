import React, { useEffect, useReducer } from 'react';
import marked from 'marked';

import './App.css';
import reducer from "./reducer";
import { AppState, Note } from "./types";

const storedNotesString = localStorage.getItem('notes');
const parsedStoredNotes: Note[] = storedNotesString ? JSON.parse(storedNotesString) : [];

const initialState: AppState = {
  notes: parsedStoredNotes,
  currentNoteIndex: null,
  isEditing: false,
  editorTitleText: '',
  editorBodyText: '',
}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const { notes, currentNoteIndex, isEditing, editorTitleText, editorBodyText } = state;
  
    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    dispatch({type: 'EDIT_TITLE', payload: e.target.value});
  }

  function handleBodyChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    dispatch({type: 'EDIT_BODY', payload: e.target.value});
  }

  return (
    <div className="App">
      {
        currentNoteIndex === null ? (
          <>
          <header>
            <h1>Notes App</h1>
          </header>

          <nav>
            <h2>All Notes</h2>
            <button onClick={() => dispatch({ type: 'CREATE_NOTE' })}>New</button>
            {notes.length ? (
            <ul>
              {notes.map((note, i) => (
                <li
                  onClick={() => dispatch({ type: 'OPEN_NOTE', payload: i })}
                  className={i === currentNoteIndex ? 'emphasis' : ''}
                >
                  {note.title}
                </li>
              ))}
            </ul>
            ): (
              // Empty State
              <p>Add your first note!</p>
            )}
          </nav>
          </>
        ) : (
          <div>
            {isEditing ? (
              <div className="vertical">
                <div>
                  <button onClick={() => dispatch({type: 'CANCEL_EDIT'})}>Cancel</button>
                  <button onClick={() => dispatch({type: 'SAVE_EDIT'})}>Save</button>
                </div>
                <input value={editorTitleText} onChange={handleTitleChange} />
                <textarea value={editorBodyText} onChange={handleBodyChange} />
                <button
                  onClick={() => dispatch({type: 'DELETE_NOTE'})}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div>
                <div>
                  <button
                    onClick={() => dispatch({type: 'CLOSE_NOTE'})}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => dispatch({type: 'START_EDIT'})}
                  >
                    Edit
                  </button>
                </div>
                <h3>{notes[currentNoteIndex].title}</h3>
                <div dangerouslySetInnerHTML={{ __html: marked(notes[currentNoteIndex].body)}}>
                </div>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
}

export default App;
