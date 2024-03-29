import styled from 'styled-components';
import { PageContainer } from '../components';
import { useData } from '../contexts/DataContext';
import { EmptyState, NotesContainer, NoteCard, PageHeader } from '../components';
export const Archive = () => {
    const { archiveNotes } = useData()
    return (
        <PageContainer>
            <PageHeader><HeadingLarge>Archive</HeadingLarge></PageHeader>
            {archiveNotes.length === 0 ? (<EmptyState>
                <h3>No notes Here</h3>
            </EmptyState>) : (
                <NotesContainer>
                    {archiveNotes.map((note) => (<NoteCard note={note} key={note._id} />))}
                </NotesContainer>
            )
            }
        </PageContainer>

    )
}
const HeadingLarge = styled.h1`
margin-right: auto;
`;
