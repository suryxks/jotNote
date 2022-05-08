import { createContext, useState, useContext } from 'react';

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
    const [isFilterFormOpen,setIsFilterFormOpen]=useState()
    return (<ModalContext.Provider value={{ isNotesModalOpen, setIsNotesModalOpen }}>{children}</ModalContext.Provider>)
}

export const useModal = () => useContext(ModalContext);