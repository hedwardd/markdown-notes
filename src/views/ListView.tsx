/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import marked from "marked";

import { Action, AppState } from "../types";

type Props = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export default function ListView({ state, dispatch }: Props): JSX.Element {
  const { notes } = state;

  return (
    <div className="list-view">
      <button
        type="button"
        className="new-note-btn"
        onClick={() => dispatch({ type: "CREATE_NOTE" })}
      >
        New
      </button>
      <div className="list-wrapper">
        {notes.length ? (
          <ul className="note-list">
            {notes.map((note, i) => (
              <li
                className="note-list-item"
                onClick={() => dispatch({ type: "OPEN_NOTE", payload: i })}
              >
                <h3 className="list-note-title">{note.title}</h3>

                <div
                  className="list-note-body"
                  dangerouslySetInnerHTML={{ __html: marked(note.body) }}
                />
              </li>
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
