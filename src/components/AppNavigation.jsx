import styled from 'styled-components';
import {Link ,useLocation} from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
export const AppNavigation = () => {
    const location=useLocation();
    const {pathname}=location;
    return (
        <NavWrapper>
            <MenuList>
                <PageLink to='/' className={`sidebar-item ${pathname==='/'?'current-tab':''}`}><MenuListItem><HomeOutlinedIcon fontSize='large' /><div>Home</div></MenuListItem></PageLink>
                <PageLink to='/labels' className={`sidebar-item ${pathname==='/labels'?'current-tab':''}`}><MenuListItem><LabelOutlinedIcon fontSize='large' /><div>Labels</div></MenuListItem></PageLink>
                <PageLink to='/archive' className={`sidebar-item ${pathname==='/archive'?'current-tab':''}`}><MenuListItem><ArchiveOutlinedIcon fontSize='large' /><div>Archive</div></MenuListItem></PageLink>
                <PageLink to='/trash' className={`sidebar-item ${pathname==='/trash'?'current-tab':''}`}><MenuListItem><DeleteOutlinedIcon fontSize='large' /><div>Trash</div></MenuListItem></PageLink>
            </MenuList>
        </NavWrapper>)
}

const NavWrapper = styled.nav`
 grid-area: appNavigation;
 padding:1rem;
 max-width :250px;
 @media (max-width: 550px) ,(max-width:1100px){
    max-width :100%;
}
`;
const MenuList = styled.ol`
 list-style: none;
 position: sticky;
 top:6rem;
 left: 0;
 display: flex;
 flex-direction: column;
 @media (max-width: 550px) ,(max-width:1100px){
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
`;
const MenuListItem = styled.li`
    list-style: none;
    display: flex;
    gap:1rem;
    padding:0.5rem;
    border-radius: 6px;
    font-weight: bolder;
    font-size: 1.2rem;
    align-items:center;
    /* color: var(--grey-txt); */
    &:hover{
        background-color: var(--menu-hover);
        color: var(--cta);
        font-weight: bolder;
    }
    @media (max-width: 550px),(max-width:1100px) {
      
       display: inline-block;
       justify-content: center;
       align-items: center;
}
`
const PageLink = styled(Link)`
text-decoration: none;
&.current-tab>li{
    color:var(--cta)
}
&:visited{
    color:var(--grey-txt)
}
`

