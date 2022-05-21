export const initialFilterState = {
    sortLowToHigh: false,
    sortHighToLow: false,
    sortByLatest: false,
    sortByOldest: false,
    filterLowPriority: false,
    filterHighPriority: false,
}

export const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'SORT_LOW_TO_HIGH': {
            return { ...state, sortLowToHigh: true, sortHighToLow: false, sortByLatest: false, sortByOldest: false }
        }
        case 'SORT_HIGH_TO_LOW': {
            return { ...state, sortLowToHigh: false, sortHighToLow: true, sortByLatest: false, sortByOldest: false }
        }
        case 'SORT_BY_LATEST': {
            return { ...state, sortByLatest: true, sortByOldest: false, sortLowToHigh: false, sortHighToLow: false }
        }
        case 'SORT_BY_OLDEST': {
            return { ...state, sortByLatest: false, sortByOldest: true, sortLowToHigh: false, sortHighToLow: false }
        }
        case 'FILTER_LOW_PRIORITY': {
            return { ...state, filterLowPriority: true, filterHighPriority: false }
        }
        case 'FILTER_HIGH_PRIORITY': {
            return { ...state, filterLowPriority: false, filterHighPriority: true }
        }
        case 'CLEAR': {
            return { initialFilterState }
        }
        default: {
            return { ...state };
        }
    }
}