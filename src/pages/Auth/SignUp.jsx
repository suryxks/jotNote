import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonCta,PageContainer } from '../../components';
import { useAuth } from '../../contexts/auth-context';
export const SignUp = () => {
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
    })
    const { signupHandler } = useAuth();
    const navigate = useNavigate();
    return (
        <PageContainer>
            <FormContainer>
                <FormHeading>SignUp</FormHeading>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <FormInput type='email' id='email' name='email' value={formInput.email}
                    onChange={(event) => { setFormInput(prev => ({ ...prev, email: event.target.value })) }
                    }>
                </FormInput>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <FormInput type='password' id='password' name='password' value={formInput.password}
                    onChange={(event) => { setFormInput(prev => ({ ...prev, password: event.target.value })) }
                    }>
                </FormInput>
                <ButtonCta onClick={()=>{
                    signupHandler(formInput);
                    navigate('/');
                }}>SignUp</ButtonCta>
            </FormContainer>
        </PageContainer>
    )
}
const FormContainer = styled.form`
   width: 350px;
    display: flex;
    flex-direction: column;
    border:2px solid #d4d4d8;
    /* align-items: ; */
    margin: 2rem auto;
    border-radius: 8px;
    height: fit-content;
    padding: 1rem;
`
const FormHeading = styled.h1`
    margin: 0.5rem auto;
`
const FormInput = styled.input`
 margin:1rem;
 margin-top: 0;
 outline:2px solid #d4d4d8;
 border:none;
 background-color:#d4d4d8 ;
 padding:0.5rem;
 border-radius: 4px;
`;

const InputLabel = styled.label`
margin:0.5rem 1rem;
margin-bottom:0;
`;