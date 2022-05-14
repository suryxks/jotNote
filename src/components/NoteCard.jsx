import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import PushPinTwoToneIcon from '@mui/icons-material/PushPinTwoTone';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useModal } from '../contexts/ModalContext';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/auth-context';
import { useTags } from '../contexts/TagsContext';
const TagChip = ({ TagName }) => {
    return <Tag>{TagName}</Tag>
}
const Tag = styled.div`
background-color: black;
color: var(--white);
font-weight: bold;
font-size: 0.8rem;
padding: 4px 8px;
border-radius: 10px;
`;
export const NoteCard = ({ note }) => {
    const location = useLocation();
    const { pathname } = location;
    const { setCurrentNote, editNote, archiveNote, restoreFromArchive, archiveNotes, deleteFromTrash, restoreFromTrash, addToTrash } = useData();
    const { auth } = useAuth();
    const { setIsNotesModalOpen } = useModal();
    const { tags } = useTags();
    const { title, priority, content, color, isPinned } = note;
    const { encodedToken } = auth;
    const currentTags = tags.reduce((acc, currentTag) => {
        const isNotePresentInTag = currentTag.notes.find(item => item.id === note.id)
        if (isNotePresentInTag) {
            return [...acc, currentTag.name]
        }
        return acc;
    }, [])
    console.log(currentTags);
    return (
        <NoteCardWrapper color={color} onClick={() => {
            if (pathname === '/') {
                setCurrentNote(note);
                setIsNotesModalOpen(true);
            }
        }}>
            <NoteCardHeader>
                <NoteTitle>{title}</NoteTitle>
                <PriorityContainer>{priority}</PriorityContainer>
                {
                    isPinned ? <PushPinIcon onClick={(e) => {
                        e.stopPropagation();
                        editNote(encodedToken, { ...note, isPinned: !note.isPinned }, note._id)

                    }} />
                        : <PushPinTwoToneIcon onClick={(e) => {
                            e.stopPropagation();
                            editNote(encodedToken, { ...note, isPinned: !note.isPinned }, note._id)
                        }} />
                }
            </NoteCardHeader>
            <NoteContent>{content}</NoteContent>
            <TagsContainer>
                {currentTags.map(tag => <TagChip TagName={tag} />)}
            </TagsContainer>
            <ActionButtonGroup>
                {pathname === '/trash' ? '' : archiveNotes.find(item => item._id === note._id) ?
                    <UnarchiveIcon onClick={(e) => {
                        e.stopPropagation();
                        restoreFromArchive(encodedToken, note, note._id);
                    }} /> :
                    <ArchiveIcon onClick={(e) => {
                        e.stopPropagation();
                        archiveNote(encodedToken, note, note._id);
                    }} />}

                {pathname === '/trash' ? <>
                    <RestoreFromTrashIcon onClick={(e) => {
                        e.stopPropagation();
                        restoreFromTrash(encodedToken, note, note._id);
                    }} />
                    <DeleteForeverIcon onClick={(e) => {
                        e.stopPropagation();
                        deleteFromTrash(encodedToken, note._id);
                    }} />
                </> : <DeleteIcon onClick={(e) => {
                    e.stopPropagation();
                    addToTrash(encodedToken, note, note._id);
                }} />}

            </ActionButtonGroup>
        </NoteCardWrapper>);
};
const TagsContainer = styled.div`
 display: flex;
 overflow: auto;
 white-space: nowrap;
 text-overflow: ellipsis;
 gap:4px;
 position: absolute;
 bottom: 40px;
`
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
