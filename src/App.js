import {GlobalStyles} from './GlobalStyles';
import styled from 'styled-components'
import {Header,AppNavigation} from './components';
import {AppRoutes} from './components/AppRoutes.jsx'
function App() {
  return (
    <AppWrapper>
      <Header/>
      <AppNavigation/>
      <AppRoutes/>
      <GlobalStyles/>
    </AppWrapper>
  );
}
const AppWrapper=styled.div`
height: 100vh;
width: 100%;
margin: 0;
display: grid;
background-color: #F3F4F6;
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
