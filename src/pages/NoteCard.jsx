import styled from 'styled-components';
import PushPinTwoToneIcon from '@mui/icons-material/PushPinTwoTone';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useModal } from '../contexts/ModalContext';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/auth-context';

export const NoteCard = ({ note }) => {
    const { setCurrentNote, editNote } = useData();
    const { auth } = useAuth();
    const { setIsNotesModalOpen } = useModal();
    const { title, priority, content, color, isPinned } = note;
    const { encodedToken } = auth;
    return (
        <NoteCardWrapper color={note.color} onClick={() => {
            setCurrentNote(note);
            setIsNotesModalOpen(true);
        }}>
            <NoteCardHeader>
                <NoteTitle>{title}</NoteTitle>
                <PriorityContainer>{priority}</PriorityContainer>
                {
                    isPinned ? <PushPinIcon onClick={(e) => {
                        e.stopPropagation();
                        editNote(encodedToken, { ...note, isPinned: !note.isPinned },note._id)

                    }} />
                        : <PushPinTwoToneIcon onClick={(e) => {
                            e.stopPropagation();
                            editNote(encodedToken, { ...note, isPinned: !note.isPinned },note._id)
                        }} />
                }
            </NoteCardHeader>
            <NoteContent>{content}</NoteContent>
            <ActionButtonGroup>
                <ArchiveIcon />
                <DeleteIcon />
            </ActionButtonGroup>
        </NoteCardWrapper>);
};
const ActionButtonGroup = styled.div`
position:absolute;
bottom: 0;
right:0;
display: flex;
align-items: flex-end;
justify-content: flex-end;
gap:8px;
margin: 1rem;
cursor:pointer;
`;
const NoteTitle = styled.h3``;
const NoteContent = styled.p`
  
`;
const PriorityContainer = styled.h4`
color:var(--grey-txt);
margin-left: auto;
margin-right: 5px;
`;
const NoteCardHeader = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  margin-bottom: 1rem;
`;
export const NotesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,260px);
    grid-gap: 1rem;
    padding: 1rem;
    place-content: center;
`;
const NoteCardWrapper = styled.div`
position: relative;
border: 1px solid var(--grey-border);
width: 250px;
height:250px;
border-radius: 6px;
overflow: hidden;
text-overflow: ellipsis;
padding: 1rem;
background-color: ${props => `var(--${props.color})`};
color: ${props => props.color === 'white' ? 'black' : 'white'};

border: 1px solid var(--grey-border);
cursor: pointer;
  &:hover{
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px,rgb(60 64 67 / 15%) 0px 2px 6px 2px;
  }
`;
