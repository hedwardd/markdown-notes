import React from "react";

import { Action, AppState } from "../../types";

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
    <>
      <button
        type="button"
        onClick={() => dispatch({ type: "CANCEL_EDIT" })}
        className="back-button"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={() => dispatch({ type: "SAVE_EDIT" })}
        className="save-button"
      >
        Save
      </button>

      <div className="note-title">
        <input value={editorTitleText} onChange={editHandler("title")} />
      </div>

      <div className="note-body">
        <textarea
          className="note-body-editor"
          value={editorBodyText}
          onChange={editHandler("body")}
        />
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={() => dispatch({ type: "DELETE_NOTE" })}
      >
        Delete
      </button>
    </>
  );
}
