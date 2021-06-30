import React from "react";
import marked from "marked";

import { Action, AppState } from "../types";

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

  const { currentNoteIndex, editorBodyText, editorTitleText, notes } = state;

  return (
    <div className="note-container">
      <div className="top-buttons">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => dispatch({ type: "CANCEL_EDIT" })}
              className="button back-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => dispatch({ type: "SAVE_EDIT" })}
              className="button save-button"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => dispatch({ type: "CLOSE_NOTE" })}
              className="button back-button"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "START_EDIT" })}
              className="button edit-button"
            >
              Edit
            </button>
          </>
        )}
      </div>

      <div className={isEditing ? "note-title white-background" : "note-title"}>
        {isEditing ? (
          <input
            className="note-title__input"
            value={editorTitleText}
            onChange={editHandler("title")}
          />
        ) : (
          <h3 className="note-title__text">{notes[currentNoteIndex!].title}</h3>
        )}
      </div>

      <div className={isEditing ? "note-body white-background" : "note-body"}>
        {isEditing ? (
          <textarea
            className="note-body-editor"
            value={editorBodyText}
            onChange={editHandler("body")}
          />
        ) : (
          <div
            className="note-body-display"
            dangerouslySetInnerHTML={{
              __html: marked(notes[currentNoteIndex!].body),
            }}
          />
        )}
      </div>

      <button
        type="button"
        className="button delete-button"
        onClick={() => dispatch({ type: "DELETE_NOTE" })}
      >
        Delete
      </button>
    </div>
  );
}
