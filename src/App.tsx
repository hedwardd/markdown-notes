import React, { useState } from 'react';

import './App.css';

function App() {

  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setNoteText(e.target.value);
  }

  function handleEdit(e: React.UIEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsEditing(true);
  }

  function handleSave(e: React.UIEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsEditing(false);
    setNotes([...notes, noteText]);
  }

  return (
    <div className="App">
      <header>
        <h1>Notes App</h1>
      </header>
      <nav>
        <h2>Notes</h2>
        <button>New</button>
        <p>(List will go here)</p>
      </nav>
      {isEditing ? (
        <>
          <textarea value={noteText} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <button onClick={handleEdit}>Edit</button>
          <p>
            {noteText}
          </p>
        </>
      )}
    </div>
  );
}

export default App;
