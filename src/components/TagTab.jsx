import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const TagTab = ({ tabName, tagId, isCurrent }) => {
    return <Tab to={`/labels/${tagId}`} isCurrent={isCurrent}>{tabName}</Tab>
}
const Tab = styled(Link)`
    margin:0.5rem;
    text-decoration: none;
    padding:5px;
    color: ${props => props.isCurrent ? 'var(--cta)' : 'var(--grey-txt)'};
    font-weight: bold;
    border-bottom:${props => props.isCurrent ? '2px solid var(--cta)' : 'none'} ;
    &:hover{
        background-color: var(--menu-hover);
        border-radius: 4px;
        color:var(--cta);
    }
`