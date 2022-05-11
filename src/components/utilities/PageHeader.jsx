import styled from 'styled-components';

export const PageHeader = styled.div`
display: flex;
align-items: center;
border-bottom: 1px solid var(--grey-border);
max-width: 100%;
position: sticky;
@media(max-width:550px){
  flex-direction: column;
  align-items: flex-start;
}
`;
