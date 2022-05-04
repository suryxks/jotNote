import styled from 'styled-components';

export const PageContainer = styled.div`
padding:1rem;
background-color: var(--white);
margin:2rem 2rem 0 2rem;
border-top-right-radius: 8px;
border-top-left-radius: 8px;
border:1px solid #d4d4d8;
overflow: auto;
::-webkit-scrollbar {
  width: 10px;
  color: var(--cta);
  }
::-webkit-scrollbar-thumb {
  background-color: var(--grey-txt);
  border-radius: 1000px;
    background-color: var(--cta);
    border: 2px solid var(--cta);
}
@media (max-width:550px),(max-width:1100px){
  margin:0;
}
`;
