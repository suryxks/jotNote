import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        userInfo: '',
        encodedToken: '',
        isAuthenticated: false,
    })
    const loginHandler = async (credentials) => {
        try {
            const response = await axios.post('/api/auth/login', credentials);
            if (response.status === 200) {
                const { foundUser, encodedToken } = await response.data;
                setAuth({
                    encodedToken: encodedToken,
                    userInfo: foundUser,
                    isAuthenticated: true
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    const logoutHandler = () => {
        localStorage.clear();
        setAuth({
            userInfo: '',
            encodedToken: '',
            isAuthenticated: false,
        });
    }
    const signupHandler = async (credentials) => {
        // const {data}=await axios.post('/api/auth/signup',formValues);
        // const {createdUser,encodedToken}=data;
        // setAuth({token:encodedToken,userInfo:createdUser});
        try {
            const response = await axios.post('/api/auth/signup', credentials);
            const { createdUser, encodedToken } = await response.data;
            console.log(createdUser,encodedToken)
            setAuth({
                encodedToken: encodedToken,
                userInfo: createdUser,
                isAuthenticated: true
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (auth.isAuthenticated) {
            localStorage.setItem('user', JSON.stringify(auth.userInfo));
            localStorage.setItem('encodedToken', auth.encodedToken)
        } else {
            localStorage.clear();
        }
    }, [auth])
    return <AuthContext.Provider value={{ auth, setAuth, loginHandler, logoutHandler, signupHandler }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);