import React from "react";

import { Action, AppState } from "../types";

type Props = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export default function List({ state, dispatch }: Props): JSX.Element {
  const { notes } = state;

  return (
    <div className="list-container">
      <h2>All Notes</h2>

      <div className="notes-container">
        <button type="button" onClick={() => dispatch({ type: "CREATE_NOTE" })}>
          New
        </button>
        {notes.length ? (
          <ul className="notes-list">
            {notes.map((note, i) => (
              <button
                type="button"
                onClick={() => dispatch({ type: "OPEN_NOTE", payload: i })}
                className="notes-list-item"
              >
                {note.title}
              </button>
            ))}
          </ul>
        ) : (
          // Empty State
          <p>Add your first note!</p>
        )}
      </div>
    </div>
  );
}
