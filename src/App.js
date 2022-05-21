import { GlobalStyles } from './GlobalStyles';
import styled from 'styled-components'
import { Header, AppNavigation, NotesdModal, TagsModal } from './components';
import { AppRoutes } from './components/AppRoutes.jsx';
import { useData } from './contexts/DataContext';
import { useModal } from './contexts/ModalContext';
function App() {
  const { isNotesModalOpen, setIsNotesModalOpen,isTagsModalOpen,setIsTagsModalOpen } = useModal();
  const { currentNote, setCurrentNote } = useData();
  return (
    <AppWrapper isNotesModalOpen={isNotesModalOpen}>
      <Header />
      <AppNavigation />
      <AppRoutes />
      <NotesdModal isModalOpen={isNotesModalOpen} setIsModalOpen={setIsNotesModalOpen} note={currentNote} setNote={setCurrentNote} />
      <TagsModal  isTagsModalOpen={isTagsModalOpen} setIsTagsModalOpen={setIsTagsModalOpen} note={currentNote}/>
      <GlobalStyles />
    </AppWrapper>
  );
}
const AppWrapper = styled.div`
height: 100vh;
width: 100%;
margin: 0;
display: grid;
background-color: ${props => props.isNotesModalOpen ? 'rgba(0, 0, 0, 0.3)' : '#F3F4F6'};
grid-template-columns: 2fr 8fr;
grid-template-rows: 5rem 1fr;
grid-template-areas: 
'header header'
'appNavigation appContent'
;
@media (max-width: 550px),(max-width:1100px) {
  display: grid;
  grid-template-columns: 2fr;
  grid-template-areas:
  'header'
  'appContent'
  'appNavigation';
}
`;
export default App;
