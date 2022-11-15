import styled from '@emotion/styled';
import { useEffect } from 'react';
import { PageContainer, TagTab,EmptyState } from '../components';
import { useTags } from '../contexts/TagsContext';
import { useNavigate } from 'react-router-dom';
export const Labels = () => {
    const { tags } = useTags();
    const navigate = useNavigate();
    useEffect(() => {
        if (tags.length > 0) {
            const firstTag = tags[0];
            const firstTagId = firstTag._id;
            navigate(`/labels/${firstTagId}`)
        }
    }, [])
    console.log(tags)
    return (
        <PageContainer>
            {tags.length > 0 ? (<TabsContainer>
                {tags.map(tag => {
                    return (<TagTab tabName={tag.name} tagId={tag._id} isCurrent={false} key={tag._id} />)
                })}
            </TabsContainer>) : (<EmptyState><h1>No Tags Added</h1></EmptyState>)}

        </PageContainer>
    )
}
const TabsContainer = styled.div`
    display: flex;
    overflow: auto;
`