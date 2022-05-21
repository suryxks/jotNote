import { sortByDate } from "./sortByDate";
import { sortByPriority } from "./sortByPriority";
export const sortNotes = (notes, filterState) => {
    const { sortLowToHigh, sortHighToLow, sortByLatest, sortByOldest } = filterState;
    if (sortLowToHigh) {
        return sortByPriority(notes, 'low-to-high')
    }
    if (sortHighToLow) {
        return sortByPriority(notes, 'high-to-low');
    }
    if (sortByLatest) {
        return sortByDate(notes, 'latest');
    }
    if (sortByOldest) {
        return sortByDate(notes, 'oldest');
    }
    return [...notes]
}