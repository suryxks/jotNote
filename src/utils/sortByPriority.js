export const sortByPriority = (notes, sortBy) => {
    const lowPriorityNotes = notes.filter(note => note.priority === 'Low');
    const highPriorityNotes = notes.filter(note => note.priority === 'High');
    if (sortBy === 'low-to-high') {
        return [...lowPriorityNotes, ...highPriorityNotes]
    } else {
        return [...highPriorityNotes, ...lowPriorityNotes]
    }
}