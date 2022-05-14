import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useTags } from '../contexts/TagsContext';
import { NotesContainer, NoteCard } from '../components';
import { PageContainer } from './utilities/PageContainer';
import { TagTab } from './TagTab';
export const TagContent = () => {
    let { labelId } = useParams();
    const { tags } = useTags();
    console.log(labelId)
    console.log(tags);
    const tagData = tags.find(tag => tag._id === labelId);
    console.log(tagData);
    const { notes } = tagData;

    console.log(notes)
    return (
        <PageContainer>
            <TabsContainer>
                {tags.map(tag => {
                    const isCurrent = labelId === tag._id;
                    console.log(tag.name, isCurrent);
                    return (<TagTab tabName={tag.name} tagId={tag._id} isCurrent={isCurrent} />)
                })}
            </TabsContainer>
            {
                <NotesContainer>
                    {notes.map((note) => (<NoteCard note={note} />))}
                </NotesContainer>
            }
        </PageContainer>
    )


}
const TabsContainer = styled.div`
    display: flex;
    overflow: auto;
    /* white-space: nowrap; */
`
