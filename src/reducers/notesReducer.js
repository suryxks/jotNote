export const notesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTES': {
            return { ...state, notes: action.payload.notes }
        }
        case 'SET_TRASH': {
            return { ...state, trashNotes: action.payload.trashNotes }
        }
        case 'SET_ARCHIVE': {
            return { ...state, archiveNotes: action.payload.archiveNotes }
        }
        case 'SET_NOTES_AND_TRASH': {
            return { ...state, notes: action.payload.notes, trashNotes: action.payload.trashNotes }
        }
        case 'SET_NOTES_AND_ARCHIVE': {
            return { ...state, notes: action.payload.notes, archiveNotes: action.payload.archiveNotes }
        }
        default:return{...state}
    }
}