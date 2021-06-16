import DOMPurify from 'dompurify';

interface State {
  notes: string[],
  currentNoteIndex: number,
  isEditing: boolean,
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
      };
    case 'SAVE_NOTE':
      const cleanedMarkdown = DOMPurify.sanitize(action.payload);
      return {
        ...state,
        isEditing: false,
        notes: [
          ...state.notes.slice(0, state.currentNoteIndex),
          cleanedMarkdown,
          ...state.notes.slice(state.currentNoteIndex + 1,)],
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        isEditing: false,
        notes: [
          ...state.notes.slice(0, state.currentNoteIndex),
          ...state.notes.slice(state.currentNoteIndex + 1,)
        ],
        currentNoteIndex: null,
      }
    default:
      throw new Error();
  }
}

export default reducer;
