import React from "react";

import { Action, AppState } from "../../types";
import Editor from "./Editor";
import Viewer from "./Viewer";

type Props = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export default function NoteView({ state, dispatch }: Props): JSX.Element {
  const { isEditing } = state;

  const editHandler = (type: "title" | "body") => {
    const actionType = type === "title" ? "EDIT_TITLE" : "EDIT_BODY";
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: actionType, payload: e.target.value });
    };
  };

  return (
    <div className="note-container">
      {isEditing ? (
        <Editor state={state} dispatch={dispatch} editHandler={editHandler} />
      ) : (
        <Viewer state={state} dispatch={dispatch} />
      )}
    </div>
  );
}
