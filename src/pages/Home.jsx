import styled from 'styled-components';
import { PageContainer, ButtonCta, NotesModal } from '../components';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useEffect} from 'react';
import AddIcon from '@mui/icons-material/Add';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useModal } from '../contexts/ModalContext';
import { useData } from '../contexts/DataContext';
import { EmptyState, NotesContainer, NoteCard, PageHeader } from '../components';
import { HeadingLarge } from '../components/utilities/HeadingLarge';
export const Home = () => {
  const { isNotesModalOpen, setIsNotesModalOpen } = useModal();
  const { notes, currentNote, setCurrentNote } = useData();
  const pinnedNotes = notes.filter((note) => note.isPinned === true);
  const unPinnedNotes = notes.filter((note) => note.isPinned === false);
  useEffect(() => {
    window.scrollTo(0, 0);

  })
  return (<PageContainer isNotesModalOpen={isNotesModalOpen}>
    <PageHeader >
      <HeadingLarge>Notes</HeadingLarge>
      <PageActions>
        <FilterButton><FilterAltOutlinedIcon /><span>Filter</span></FilterButton>
        <ButtonCta onClick={() => { setIsNotesModalOpen(true) }}><AddIcon /> <span>Add Note</span></ButtonCta>
      </PageActions>
    </PageHeader>
    {notes.length === 0 ? (<EmptyNote>
      <AddNoteIcon fontSize='large' />
      <h3>No notes</h3>
      <p>Create  new Note</p>
      <ButtonCta onClick={() => { setIsNotesModalOpen(true) }}><AddIcon /><span>Add Note</span></ButtonCta>
    </EmptyNote>) : (
      <NotesContainer>
        {notes.map((note) => (<NoteCard note={note} />))}
      </NotesContainer>
    )
    }
  </PageContainer>)
}
const AddNoteIcon = styled(NoteAddOutlinedIcon)`
  color: var(--grey-txt);
  `;
const EmptyNote = styled.div`
position:absolute;
top:0;
bottom: 0;
left: 0;
right:0;
margin:auto;
 max-width: 350px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 border: 2px dashed var(--grey-border);
 height: fit-content;
 padding: 2rem;
 border-radius: 8px;
`;
const FilterButton = styled.button`
  border:1px solid var(--grey-border);
  background-color: var(--white);
  border-radius: 4px;
  padding:6px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bolder;
  height: fit-content;
`;
const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
