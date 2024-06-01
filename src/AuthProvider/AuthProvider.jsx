import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Authentication/firebase.config';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const auth = getAuth(app)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const loginUser = (email, password)=>{
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }



    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        });
        return ()=> {
            unSubscribe()
        }
    }, [user])

   const  authInfo = {
    createUser,
    setUser, user,
    loginUser

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;