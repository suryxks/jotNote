export const filterByPriority = (notes, filterState) => {
    const { filterLowPriority, filterHighPriority } = filterState;
    if (filterLowPriority) {
        return notes.filter(note => note.priority === 'Low')
    }
    if (filterHighPriority) {
        return notes.filter(note => note.priority === 'High');
    }
    return [...notes]

}