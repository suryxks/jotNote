import { createContext, useState, useContext } from "react";
import axios from 'axios';
import { useAuth } from "./auth-context";
import { useEffect } from "react";
const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [trashNotes, setTrashNotes] = useState([]);
    const [archiveNotes, setArchiveNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState({
        title: '',
        content: '',
        color: 'white',
        priority: 'low',
        isPinned: false,
    });
    const { auth } = useAuth();
    const { encodedToken } = auth;
    const getNotes = async (encodedToken) => {
        try {
            const { data } = await axios.get('/api/notes', { headers: { authorization: encodedToken } });
            setNotes(data.notes)
        } catch (e) {
            console.error(e)
        }
    }
    const postNote = async (encodedToken, note) => {
        try {
            const { data } = await axios.post('/api/notes', { note }, { headers: { authorization: encodedToken } });
            setNotes(data.notes)
        } catch (e) {
            console.error(e);
        }
    }
    const editNote = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/notes/${noteId}`, { note }, { headers: { authorization: encodedToken } });
            setNotes(data.notes)
        } catch (e) {
            console.error(e);
        }
    }
    const getTrash = async (encodedToken) => {
        try {
            const { data } = await axios.get('/api/trash', { headers: { authorization: encodedToken } });
            setTrashNotes(data.trash)
        } catch (e) {
            console.error(e)
        }
    }
    const deleteFromTrash = async (encodedToken, noteId) => {
        try {
            const { data } = await axios.delete(`/api/trash/delete/${noteId}`, { headers: { authorization: encodedToken } })
            setTrashNotes(data.trash)
        } catch (e) {
            console.error(e);
        }
    }
    const restoreFromTrash = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/trash/restore/${noteId}`, { note }, { headers: { authorization: encodedToken } })
            setNotes(data.notes);
            setTrashNotes(data.trash);
        } catch (e) {
            console.error(e)
        }
    }
    const getArchives = async (encodedToken) => {
        try {
            const { data } = await axios.get('/api/archives', { headers: { authorization: encodedToken } });
            setArchiveNotes(data.archives)
        } catch (e) {
            console.error(e)
        }
    }
    const archiveNote = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/notes/archives/${noteId}`, { note }, { headers: { authorization: encodedToken } })
            setArchiveNotes(data.archives);
            setNotes(data.notes)
        } catch (e) {
            console.error(e);
        }
    }
    const restoreFromArchive = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/archives/restore/${noteId}`, { note }, { headers: { authorization: encodedToken } })
            setArchiveNotes(data.archives);
            setNotes(data.notes)
        } catch (e) {
            console.error(e);
        }
    }
    const addToTrash = async (encodedToken, note, noteId) => {
        try {
            const { data } = await axios.post(`/api/notes/trash/${noteId}`, { note }, { headers: { authorization: encodedToken } })
            setNotes(data.notes);
            setTrashNotes(data.trash);
        } catch (e) {
            console.error(e);
        }
    }
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
                addToTrash
            }}>{children}</DataContext.Provider>)
}
export const useData = () => useContext(DataContext);