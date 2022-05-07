import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { ButtonCta } from './ButtonCta';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/auth-context';
import CloseIcon from '@mui/icons-material/Close';
export const NotesdModal = ({ isModalOpen, setIsModalOpen, note, setNote }) => {
    const { title, content, color, priority } = note;
    const modalref = useRef();
    const { postNote, editNote } = useData();
    const { auth } = useAuth();
    const { encodedToken } = auth;
    const emptyNote = {
        title: '',
        content: '',
        color: 'white',
        priority: 'low',
        isPinned: false,
    };
    useOnClickOutside(modalref, () => setIsModalOpen(false));
    if (!isModalOpen) return null;
    return createPortal(
        <ModalContainer ref={modalref}>
            <ModalHeader>Create Note</ModalHeader>
            <CloseModalButton onClick={() => { setIsModalOpen(false) }}><CloseIcon /></CloseModalButton>
            <NoteInputContainer>
                <TitleInput
                    type='text'
                    placeholder='Title'
                    autoFocus
                    value={title}
                    onChange={(e) => { setNote(prev => ({ ...prev, title: e.target.value })) }}>
                </TitleInput>
                <NoteContent
                    placeholder='Take a Note'
                    value={content}
                    onChange={(e) => { setNote(prev => ({ ...prev, content: e.target.value })) }}>
                </NoteContent>
            </NoteInputContainer>
            <NoteProperties>
                <SelectWrapper>
                    <label htmlFor='priority'>Priority:</label>
                    <Select
                        name='priority'
                        id='priority'
                        onChange={(e) => { setNote(prev => ({ ...prev, priority: e.target.value })) }
                        }>
                        <option value='Low' selected={priority === 'Low'}>Low</option>
                        <option value='High' selected={priority === 'High'}>High</option>
                    </Select>
                </SelectWrapper>
                <SelectWrapper>
                    <label htmlFor='color'>Colour:</label>
                    <Select
                        name='color'
                        id='color'
                        onChange={(e) => { setNote(prev => ({ ...prev, color: e.target.value })) }
                        }>
                        <option value='white' selected={color === 'white'}>white</option>
                        <option value='blue' selected={color === 'blue'}>Blue</option>
                        <option value='green' selected={color === 'green'}>Green</option>
                        <option value='purple' selected={color === 'purple'}>Purple</option>
                    </Select>
                </SelectWrapper>
                <SelectWrapper>
                    <label htmlFor='tags'>Tag:</label>
                    <Select name='color' id='color'>
                        <option>--default</option>
                    </Select>
                </SelectWrapper>
            </NoteProperties>
            <ButtonWrapper>
                <AddLabelButton>Add Label</AddLabelButton>
                <ButtonCta onClick={() => {
                    if (note._id) {
                        editNote(encodedToken, note, note._id);
                        setNote(emptyNote)
                        setIsModalOpen(false)
                    } else {
                        postNote(encodedToken, note);
                        setNote(emptyNote)
                        setIsModalOpen(false)
                    }
                }}>Add Note</ButtonCta>
            </ButtonWrapper>
        </ModalContainer>
        , document.getElementById('note-modal'))
}
const ModalContainer = styled.div`
    border:1px solid var(--grey-border);
    background-color: var(--white);
    position:absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    max-width:550px;
    height: 450px;
    padding:0.5rem;
    border-radius: 8px;
    /* background-color: rgba(0, 0, 0, 0.3); */
    @media (max-width: 550px){
        width: 100%;
        height: 100%;
        top:10rem;
        /* max-width: 100%; */
    }
`
const CloseModalButton = styled.button`
background-color: var(--white); 
border: none;
position: absolute;
top:0;
right: 0;
margin:1rem;
font-weight: bolder;
/* padding:2px 5px; */
cursor: pointer;
`
const ModalHeader = styled.h2`
    border-bottom: 1px solid var(--grey-border);
    padding-bottom:5px;
    isolation: isolate;
`
const NoteInputContainer = styled.div`
    border: 1px solid var(--grey-border);
    margin:0.5rem auto;
    border-radius: 4px;
    padding: 5px;
    height:fit-content;
    height: 60%;
`
const TitleInput = styled.input`
    width:100%;
    border:none;
    outline:none;
    font-size:1.2rem ;
    padding:5px;
`;
const NoteContent = styled.textarea`
    width:100%;
    border:none;
    outline:none;
    resize:none;
    padding:5px;
    height: 80%;
`;
const SelectWrapper = styled.div`
   display: flex;
    gap:5px;
    align-items: center;
`
const Select = styled.select`
    padding: 2px;
    border-radius: 4px;
    margin:5px;
`
const NoteProperties = styled.div`
    display: flex;
    flex-wrap:wrap;
`
const AddLabelButton = styled.button`
border:none;
color:var(--cta);
font-weight: bolder;
background-color: var(--white);
cursor:pointer;
padding:6px 8px;
border-radius: 4px;
&:hover{
    background-color: var(--menu-hover);
}
`
const ButtonWrapper = styled.div`
    display:flex;
    align-items: center;
    justify-content: flex-end;
`