import { createContext, useState, useContext } from "react";
import axios from 'axios';
import { useAuth } from "./auth-context";
import { useEffect } from "react";
const DataContext = createContext(null);

export const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState({
        title: '',
        content: '',
        color: 'white',
        priority: 'low',
        isPinned:false,
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
    const editNote=async(encodedToken,note,noteId)=>{
        try{
         const {data}=await axios.post(`/api/notes/${noteId}`,{note},{ headers: { authorization: encodedToken } });
         setNotes(data.notes)
        }catch(e){

        }
    }
    useEffect(() => {
        getNotes(encodedToken);
    }, [])
    return (<DataContext.Provider value={{ notes, currentNote, setCurrentNote, postNote,editNote }}>{children}</DataContext.Provider>)
}
export const useData = () => useContext(DataContext);