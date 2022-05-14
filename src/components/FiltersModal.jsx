import styled from 'styled-components';
import { useData } from '../contexts/DataContext';
import CloseIcon from '@mui/icons-material/Close';
export const FiltersModal = ({ isFilterOpen, setIsFilterOpen }) => {

    const { filterDispatch, filterState } = useData();
    const { sortLowToHigh, sortHighToLow, sortByLatest, sortByOldest, filterLowPriority, filterHighPriority } = filterState;
    return (
        <div>
            {isFilterOpen ? (
                <FiltersModalContainer>
                    <CloseIcon cursor='pointer' onClick={() => setIsFilterOpen(false)} />
                    <h3>Sort By</h3>
                    <OptionWrapper>
                        <input
                            type="radio"
                            htmlFor='SORT_LOW_TO_HIGH'
                            value='SORT_LOW_TO_HIGH'
                            name='sort'
                            checked={sortLowToHigh}
                            onChange={() => filterDispatch({ type: 'SORT_LOW_TO_HIGH' })}
                        />
                        <label htmlFor='SORT_LOW_TO_HIGH' id='SORT_LOW_TO_HIGH'>Low to High</label>
                    </OptionWrapper>
                    <OptionWrapper>
                        <input
                            type="radio"
                            htmlFor='SORT_HIGH_TO_LOW'
                            value='SORT_HIGH_TO_LOW'
                            name='sort'
                            checked={sortHighToLow}
                            onChange={() => filterDispatch({ type: 'SORT_HIGH_TO_LOW' })}
                        />
                        <label htmlFor='SORT_HIGH_TO_LOW' id='SORT_HIGH_TO_LOW'>High to Low</label>
                    </OptionWrapper>
                    <OptionWrapper>
                        <input
                            type="radio"
                            htmlFor='SORT_BY_LATEST'
                            value='SORT_BY_LATEST'
                            name='sort'
                            checked={sortByLatest}
                            onChange={() => filterDispatch({ type: 'SORT_BY_LATEST' })}
                        />
                        <label htmlFor='SORT_BY_LATEST' id='SORT_BY_LATEST'>Latest</label>
                    </OptionWrapper>
                    <OptionWrapper>
                        <input
                            type="radio"
                            htmlFor='SORT_BY_OLDEST'
                            value='SORT_BY_OLDEST'
                            name='sort'
                            checked={sortByOldest}
                            onChange={() => filterDispatch({ type: 'SORT_BY_OLDEST' })}
                        />
                        <label htmlFor='SORT_BY_OLDEST' id='SORT_BY_OLDEST'>Oldest</label>
                    </OptionWrapper>
                    <h3>Priority</h3>
                    <OptionWrapper>
                        <input
                            type="radio"
                            htmlFor='FILTER_LOW_PRIORITY'
                            value='FILTER_LOW_PRIORITY'
                            name='filter'
                            checked={filterLowPriority}
                            onChange={() => filterDispatch({ type: 'FILTER_LOW_PRIORITY' })}
                        />
                        <label htmlFor='FILTER_LOW_PRIORITY' id='FILTER_LOW_PRIORITY'>Low</label>
                    </OptionWrapper>
                    <OptionWrapper>
                        <input
                            type="radio"
                            htmlFor='FILTER_HIGH_PRIORITY'
                            value='FILTER_HIGH_PRIORITY'
                            name='filter'
                            checked={filterHighPriority}
                            onChange={() => filterDispatch({ type: 'FILTER_HIGH_PRIORITY' })}
                        />
                        <label htmlFor='FILTER_HIGH_PRIORITY' id='FILTER_HIGH_PRIORITY'>High</label>
                    </OptionWrapper>
                    <ClearButton onClick={() => filterDispatch({ type: 'CLEAR' })}>Clear Filters</ClearButton>
                </FiltersModalContainer>) : null}
        </div >

    )
}
const FiltersModalContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--grey-border);
    width: fit-content;
    border-radius: 4px;
    position: absolute;
    top:4.5rem;
    right: 6.5rem;
    background-color: white;
    @media (max-width:550px){
        position: absolute;
        top:8rem;
        left:1rem;
        background-color: white;
    }
`
const OptionWrapper = styled.div`
 display: flex;
 gap:8px;
 align-items: center;
`;
const ClearButton = styled.button`
border:none;
color:var(--cta);
font-weight: bolder;
background-color: var(--white);
cursor:pointer;
padding:6px 8px;
border-radius: 4px;
&:hover{
    background-color: var(--menu-hover);
}
`