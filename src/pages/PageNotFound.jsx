import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { PageContainer, ButtonCta, EmptyState } from '../components';
export const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <PageContainer>
            <EmptyState>
                <h1>404 Page not found</h1>
                <ButtonCta onClick={() => navigate('/')}><KeyboardBackspaceIcon /><span> Go back home</span></ButtonCta>
            </EmptyState>
        </PageContainer>
    )
}