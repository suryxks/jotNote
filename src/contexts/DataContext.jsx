import { createContext, useState, useContext, useEffect, useReducer } from "react";
import axios from 'axios';
import { useAuth } from "./auth-context";
import { notesReducer } from "../reducers/notesReducer";
import { v4 as uuid } from "uuid";
import { initialFilterState, filtersReducer } from '../reducers/filtersReducer';
import { filterByPriority, sortNotes } from '../utils';
const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [notesData, notesDispatch] = useReducer(notesReducer, {
        notes: [],
        trashNotes: [],
        archiveNotes: []
    })
    const { notes, trashNotes, archiveNotes } = notesData;
    const [filterState, filterDispatch] = useReducer(filtersReducer, initialFilterState)
    const [currentNote, setCurrentNote] = useState({
        id: uuid(),
        title: '',
        content: '',
        color: 'white',
        priority: 'Low',
        isPinned: false,
        date: new Date(),
    });
    const { auth: { encodedToken } } = useAuth();
    const getNotes = async (encodedToken) => {
        try {
            const { data } = await axios.get('/api/notes', { headers: { authorization: encodedToken } });
            notesDispatch({
                type: 'SET_NOTES',
                payload: { notes: data.notes }
            })
        } catch (e) {
            console.error(e)
        }
    }
    const postNote = async (encodedToken, note) => {
        try {
            const { data } = await axios.post('/api/notes', { note }, { headers: { authorization: encodedToken } });
            notesDispatch({
                type: 'SET_NOTES',
                payload: { notes: data.notes }
            })
        } catch (e) {
            console.error(e);
        }
    }
    const editNote = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/notes/${noteId}`, { note }, { headers: { authorization: encodedToken } });
            notesDispatch({
                type: 'SET_NOTES',
                payload: { notes: data.notes }
            })
        } catch (e) {
            console.error(e);
        }
    }
    const getTrash = async (encodedToken) => {
        try {
            const { data } = await axios.get('/api/trash', { headers: { authorization: encodedToken } });
            notesDispatch({
                type: 'SET_TRASH',
                payload: { trashNotes: data.trash }
            })
        } catch (e) {
            console.error(e)
        }
    }
    const deleteFromTrash = async (encodedToken, noteId) => {
        try {
            const { data } = await axios.delete(`/api/trash/delete/${noteId}`, { headers: { authorization: encodedToken } })
            notesDispatch({
                type: 'SET_TRASH',
                payload: { trashNotes: data.trash }
            })
        } catch (e) {
            console.error(e);
        }
    }
    const restoreFromTrash = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/trash/restore/${noteId}`, { note }, { headers: { authorization: encodedToken } })
            notesDispatch({
                type: 'SET_NOTES_AND_TRASH',
                payload: { trashNotes: data.trash, notes: data.notes }
            })
        } catch (e) {
            console.error(e)
        }
    }
    const getArchives = async (encodedToken) => {
        try {
            const { data } = await axios.get('/api/archives', { headers: { authorization: encodedToken } });
            notesDispatch({
                type: 'SET_ARCHIVE',
                payload: { archiveNotes: data.archives }
            })
        } catch (e) {
            console.error(e)
        }
    }
    const archiveNote = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/notes/archives/${noteId}`, { note }, { headers: { authorization: encodedToken } })
            notesDispatch({
                type: 'SET_NOTES_AND_ARCHIVE',
                payload: { archiveNotes: data.archives, notes: data.notes }
            })
        } catch (e) {
            console.error(e);
        }
    }
    const restoreFromArchive = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/archives/restore/${noteId}`, { note }, { headers: { authorization: encodedToken } })
            notesDispatch({
                type: 'SET_NOTES_AND_ARCHIVE',
                payload: { archiveNotes: data.archives, notes: data.notes }
            })
        } catch (e) {
            console.error(e);
        }
    }
    const addToTrash = async (encodedToken, note, noteId) => {
        try {
            console.log(note)
            const { data } = await axios.post(`/api/notes/trash/${noteId}`, { note }, { headers: { authorization: encodedToken } })
            console.log(data)
            notesDispatch({
                type: 'SET_NOTES_AND_TRASH',
                payload: { trashNotes: data.trash, notes: data.notes }
            })
        } catch (e) {
            console.error(e);
        }
    }
    const sortedNotes = sortNotes(notes, filterState);
    const filterdNotes = filterByPriority(sortedNotes, filterState);
    useEffect(() => {
        getNotes(encodedToken);
        getTrash(encodedToken);
        getArchives(encodedToken)
    }, [])
    return (
        <DataContext.Provider
            value={{
                notes,
                trashNotes,
                archiveNotes,
                currentNote,
                setCurrentNote,
                postNote,
                editNote,
                deleteFromTrash,
                restoreFromTrash,
                archiveNote,
                restoreFromArchive,
                addToTrash,
                filterState,
                filterDispatch,
                filterdNotes
            }}>{children}</DataContext.Provider>)
}
export const useData = () => useContext(DataContext);