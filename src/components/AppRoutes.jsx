import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Home, Archive, Trash, Labels, Login, SignUp } from '../pages/index';
import { TagContent } from './TagContent';
export const AppRoutes = () => {
    return (
        <RoutesWrapper>
            <Route path='/' element={<Home />} />
            <Route path='/archive' element={<Archive />} />
            <Route path='/trash' element={<Trash />} />
            <Route path='/labels/:labelId' element={<TagContent />} />
            <Route path='/labels' element={<Labels />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </RoutesWrapper>
    );
}

const RoutesWrapper = styled(Routes)`
    grid-area: appContent;
`