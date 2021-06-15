import React, { useState } from 'react';

interface PropTypes {
  editorText: string,
  handleEdit: React.ChangeEventHandler,
}

export default function NoteEditor ({ editorText, handleEdit }: PropTypes) {
  return <textarea value={editorText} onChange={handleEdit} />
}