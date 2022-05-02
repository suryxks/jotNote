import "./App.css";
import logo from "./logo.png";
import {GlobalStyles} from './GlobalStyles';
import styled from 'styled-components'
function App() {
  return (
    <AppWrapper>
      <h1>THis is home</h1>
      <GlobalStyles/>
    </AppWrapper>
  );
}
const AppWrapper=styled.div`
height: 100vh;
width: 100%;
background-color: #fffffe;
margin: 0;
`;
export default App;
