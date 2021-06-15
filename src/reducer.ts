interface State {
  notes: string[],
  currentNoteIndex: number,
  isEditing: boolean,
  editorText: string | null,
}

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'CREATE_NOTE':
      return {
        ...state,
        notes: [...state.notes, ''],
        isEditing: true,
        currentNoteIndex: state.notes.length,
      };
    case 'OPEN_NOTE':
      return {
        ...state,
        currentNoteIndex: action.payload,
        isEditing: false,
      };
    case 'EDIT_CURRENT_NOTE':
      return {
        ...state,
        isEditing: true,
        editorText: state.notes[state.currentNoteIndex],
      };
    case 'SAVE_NOTE':
      return {
        ...state,
        isEditing: false,
        notes: [
          ...state.notes.slice(0, state.currentNoteIndex),
          action.payload,
          ...state.notes.slice(state.currentNoteIndex,)],
      };
    case 'DELETE_NOTE':
      // TODO
      return {
        ...state,
      }
    default:
      throw new Error();
  }
}

export default reducer;
