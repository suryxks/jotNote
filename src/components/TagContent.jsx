import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useTags } from '../contexts/TagsContext';
import { NotesContainer, NoteCard } from '../components';
import { PageContainer } from './utilities/PageContainer';
import { TagTab } from './TagTab';
export const TagContent = () => {
    let { labelId } = useParams();
    const { tags } = useTags();
    const tagData = tags.find(tag => tag._id === labelId);
    const { notes } = tagData;
    return (
        <PageContainer>
            <TabsContainer>
                {tags.map(tag => {
                    const isCurrent = labelId === tag._id;
                    return (<TagTab tabName={tag.name} tagId={tag._id} isCurrent={isCurrent} key={tag._id} />)
                })}
            </TabsContainer>
            {
                <NotesContainer>
                    {notes.map((note) => (<NoteCard note={note} key={ note._id} />))}
                </NotesContainer>
            }
        </PageContainer>
    )


}
const TabsContainer = styled.div`
    display: flex;
    overflow: auto;
`
