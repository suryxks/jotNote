import { CurrencyExchangeTwoTone } from "@mui/icons-material";

export const tagsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TAG': {
            return [...state, action.payload];
        }
        case 'ADD_NOTE': {
            let currentTag = state.filter((tag) => tag._id == action.tagId)[0];
            const index=state.indexOf(currentTag)
            currentTag = { ...currentTag, notes: [...currentTag.notes, action.payload] }
            const newState=[...state];
            newState[index]=currentTag;
            return [...newState];
        }
        case 'DELETE_NOTE': {
            let currentTag = state.filter((tag) => tag._id == action.tagId)[0];
            const index=state.indexOf(currentTag)
            const filteredNotes = currentTag.notes.filter((note) => note.id !== action.noteId)
            currentTag = { ...currentTag, notes: [...filteredNotes] }
            const newState=[...state];
            newState[index]=currentTag;
            return [...newState];
        }
    }
}