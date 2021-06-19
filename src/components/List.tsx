import React from "react";

import { Action, AppState } from "../types";

type Props = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export default function List({ state, dispatch }: Props): JSX.Element {
  const { currentNoteIndex, notes } = state;

  return (
    <>
      <header>
        <h1>Notes App</h1>
      </header>

      <nav>
        <h2>All Notes</h2>
        <button type="button" onClick={() => dispatch({ type: "CREATE_NOTE" })}>
          New
        </button>
        {notes.length ? (
          <ul>
            {notes.map((note, i) => (
              <button
                type="button"
                onClick={() => dispatch({ type: "OPEN_NOTE", payload: i })}
                className={i === currentNoteIndex ? "emphasis" : ""}
              >
                {note.title}
              </button>
            ))}
          </ul>
        ) : (
          // Empty State
          <p>Add your first note!</p>
        )}
      </nav>
    </>
  );
}
