import React from "react";
import marked from "marked";

import { Action, AppState } from "../../types";

type Props = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export default function Viewer({ state, dispatch }: Props): JSX.Element {
  const { currentNoteIndex, notes } = state;

  return (
    <>
      <button
        type="button"
        onClick={() => dispatch({ type: "CLOSE_NOTE" })}
        className="back-button secondary-btn"
      >
        Back
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "START_EDIT" })}
        className="edit-button primary-btn"
      >
        Edit
      </button>
      <div className="note-title">
        <h3>{notes[currentNoteIndex!].title}</h3>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: marked(notes[currentNoteIndex!].body),
        }}
        className="note-body"
      />
    </>
  );
}
