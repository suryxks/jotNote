import styled from 'styled-components';

export const EmptyState = styled.div`
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
