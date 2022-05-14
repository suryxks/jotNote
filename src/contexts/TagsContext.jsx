import { createContext, useState, useContext, useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { tagsReducer } from "../reducers/tagsReducer";
const TagsContext = createContext(null);

export const TagsProvider = ({ children }) => {
    const intitalTags=[{ _id: uuid(), notes: [], name: 'Work' },{ _id: uuid(), notes: [], name: 'Home' }]
    const [tags, tagsDispatch] = useReducer(tagsReducer,intitalTags )
    return (<TagsContext.Provider value={{ tags, tagsDispatch }}>{children}</TagsContext.Provider>)
}

export const useTags = () => useContext(TagsContext);