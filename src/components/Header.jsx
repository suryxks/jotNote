import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { ButtonCta } from './ButtonCta';
import { useAuth } from '../contexts/auth-context';
export const Header = () => {
    const {auth,logoutHandler}=useAuth();
    const navigate=useNavigate();
    const {isAuthenticated}=auth;
    return (
        <HeaderWrapper>
           <BrandLink to='/'><BrandName>📒JotNote</BrandName></BrandLink>
           <ButtonCta onClick={()=>{
               if(isAuthenticated){
                   logoutHandler();
               }else{
                  navigate('/login');
               }
           }}>{isAuthenticated?'Logout':'Login'}</ButtonCta>
            <ProfileIcon />
        </HeaderWrapper>
        )
}

const HeaderWrapper = styled.nav`
 position: sticky;
 top:0;
 display: flex;
 background-color:#1f2937;
 z-index: 1;
 padding:0.5rem;
 box-shadow: 0px 10px 4px -4px hsl(0deg 0% 0% / 20%);
 align-items: baseline;
 gap:8px;
 grid-area: header;
 max-height: 5rem;
`;
const BrandName = styled.h1`
font-weight: strong;
 color: var(--cta);
`;
const ProfileIcon = styled(PersonIcon)`
 color:var(--cta);
 align-self: center;
 margin-right: 1rem;
 cursor:pointer;
`;
const BrandLink = styled(Link)`
text-decoration: none;
margin-right: auto;
`;