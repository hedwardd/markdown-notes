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
      <div>
        <button type="button" onClick={() => dispatch({ type: "CLOSE_NOTE" })}>
          Back
        </button>
        <button type="button" onClick={() => dispatch({ type: "START_EDIT" })}>
          Edit
        </button>
      </div>
      <h3>{notes[currentNoteIndex!].title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: marked(notes[currentNoteIndex!].body),
        }}
      />
    </div>
  );
}
