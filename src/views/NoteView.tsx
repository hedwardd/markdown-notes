import React from "react";
import marked from "marked";

import { Action, AppState } from "../types";

type Props = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export default function NoteView({ state, dispatch }: Props): JSX.Element {
  const {
    currentNoteIndex,
    editorBodyText,
    editorTitleText,
    isEditing,
    notes,
    showDeleteModal,
  } = state;

  const editHandler = (type: "title" | "body") => {
    const actionType = type === "title" ? "EDIT_TITLE" : "EDIT_BODY";
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: actionType, payload: e.target.value });
    };
  };
  const { title, body } = notes[currentNoteIndex!];
  const hasMadeEdit = title !== editorTitleText || body !== editorBodyText;

  return (
    <div className="note-container">
      <div className="top-buttons">
        <div className="left-buttons">
          {isEditing ? (
            <button
              type="button"
              onClick={() => dispatch({ type: "CANCEL_EDIT" })}
              className="btn back-button"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={() => dispatch({ type: "CLOSE_NOTE" })}
              className="btn back-button"
            >
              Back
            </button>
          )}
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => dispatch({ type: "CLICK_DELETE" })}
          >
            Delete
          </button>
        </div>
        {isEditing ? (
          <button
            type="submit"
            className={`btn btn-primary ${
              !hasMadeEdit && "btn-primary--disabled"
            }`}
            onClick={() => dispatch({ type: "SAVE_EDIT" })}
            disabled={!hasMadeEdit}
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-edit"
            onClick={() => dispatch({ type: "START_EDIT" })}
          >
            Edit
          </button>
        )}
      </div>

      <div className="note-title">
        {isEditing ? (
          <input
            className="note-title__input"
            value={editorTitleText}
            onChange={editHandler("title")}
            placeholder="Note Title"
          />
        ) : (
          <h3 className="note-title__text">{title}</h3>
        )}
      </div>

      <div className={isEditing ? "note-body white-background" : "note-body"}>
        {isEditing ? (
          <textarea
            className="note-body-editor"
            value={editorBodyText}
            onChange={editHandler("body")}
            placeholder="Try adding <b>markdown</b> <i>here</i>"
          />
        ) : (
          <div
            className="note-body-display"
            dangerouslySetInnerHTML={{
              __html: marked(body),
            }}
          />
        )}
      </div>
      <div className={`delete-modal ${!showDeleteModal && "hide"}`}>
        <div>Are you sure you want to delete?</div>
        <div className="space-evenly">
          <button
            type="button"
            className="btn"
            onClick={() => dispatch({ type: "CANCEL_DELETE" })}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => dispatch({ type: "DELETE_NOTE" })}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
