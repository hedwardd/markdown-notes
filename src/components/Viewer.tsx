import React from "react";
import marked from "marked";

import { Action, AppState } from "../types";

type Props = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export default function Viewer({ state, dispatch }: Props): JSX.Element {
  const { currentNoteIndex, notes } = state;

  return (
    <div>
      <div className="top-btn-wrapper">
        <button
          type="button"
          onClick={() => dispatch({ type: "CLOSE_NOTE" })}
          className="secondary-btn"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "START_EDIT" })}
          className="primary-btn"
        >
          Edit
        </button>
      </div>
      <div className="note-title-wrapper">
        <h3>{notes[currentNoteIndex!].title}</h3>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: marked(notes[currentNoteIndex!].body),
        }}
        className="note-body-wrapper"
      />
    </div>
  );
}
