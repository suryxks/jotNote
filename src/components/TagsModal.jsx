import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { createPortal } from "react-dom";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useTags } from "../contexts/TagsContext";
import { useData } from "../contexts/DataContext";
import { useModal } from '../contexts/ModalContext';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export const TagsModal = ({ isTagsModalOpen, setIsTagsModalOpen }) => {
    const { setIsNotesModalOpen } = useModal();
    const [newTagInput, setNewTagInput] = useState('')
    const { tags, tagsDispatch } = useTags();
    const { currentNote } = useData();
    const tagsModalRef = useRef();
    // useOnClickOutside(tagsModalRef, () => setIsTagsModalOpen(false))

    if (!isTagsModalOpen) return null
    return createPortal(
        <TagsModalContainer >
            <TagsHeader ref={tagsModalRef}>
                <h3>Tags</h3>
                <CloseIcon cursor='pointer' onClick={() => { setIsTagsModalOpen(false) }} />
                <InputWrapper>
                    <TagsInput type='text' placeholder='Add Label' value={newTagInput} onChange={(e) => setNewTagInput(e.target.value)} />
                    <DoneIcon cursor='pointer' onClick={() => {
                        tagsDispatch({
                            type: 'ADD_TAG',
                            payload: { _id: uuid(), notes: [], name: newTagInput }
                        })
                        setNewTagInput('');
                    }} />
                </InputWrapper>
            </TagsHeader>

            {tags.map(tag => {
                const isNotePresent=tag.notes.find(note => note.id === currentNote.id)
                return (
                    <CheckBoxContainer>
                        <input
                            type="checkbox"
                            id={tag.name}
                            name={tag.name}
                            value={tag.name}
                            checked={ isNotePresent? true : false}
                            onChange={(e) => {
                                e.preventDefault();
                                if (isNotePresent) {
                                    console.log(currentNote.id)
                                    tagsDispatch({
                                        type: 'DELETE_NOTE',
                                        tagId: tag._id,
                                        noteId: currentNote.id,
                                    })
                                } else {
                                    tagsDispatch({
                                        type: 'ADD_NOTE',
                                        tagId: tag._id,
                                        payload: currentNote,
                                    })
                                }
                            }}
                        />
                        <label htmlFor={tag.name}>{tag.name}</label>
                    </CheckBoxContainer>)
            })}

        </TagsModalContainer>, document.body)
}

const TagsModalContainer = styled.div`
  position: absolute;
  top: 0;
  left:0;
  right:0;
  bottom: 0;
  margin: auto;
  padding: 1rem;
  max-width: 250px;
  height: 300px;
  border: 1px solid var(--grey-border);
  background-color: var(--white);
  border-radius: 4px;
  z-index: 4;
  overflow: auto;
`;
const TagsHeader = styled.div`
position: sticky;
top:-1rem;
background-color: white;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: center;
`
const TagsInput = styled.input`
width: 100%;
padding:5px;
border: 2px solid var(--grey-border);
border-radius: 4px;
max-width: 180px;
`
const InputWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 0.5rem;
position:sticky;
top:0;
gap:1rem;
`
const CheckBoxContainer = styled.div`
display: flex;
align-items: center;
gap:8px;
margin-top: 0.5rem;  
`