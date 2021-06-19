import React, { ChangeEventHandler } from "react";

import { Action, AppState } from "../types";

type Props = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  editHandler: (
    type: "title" | "body"
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function Editor({
  state,
  dispatch,
  editHandler,
}: Props): JSX.Element {
  const { editorBodyText, editorTitleText } = state;

  return (
    <div className="vertical">
      <div>
        <button type="button" onClick={() => dispatch({ type: "CANCEL_EDIT" })}>
          Cancel
        </button>
        <button type="submit" onClick={() => dispatch({ type: "SAVE_EDIT" })}>
          Save
        </button>
      </div>
      <input value={editorTitleText} onChange={editHandler("title")} />
      <textarea value={editorBodyText} onChange={editHandler("body")} />
      <button type="button" onClick={() => dispatch({ type: "DELETE_NOTE" })}>
        Delete
      </button>
    </div>
  );
}
