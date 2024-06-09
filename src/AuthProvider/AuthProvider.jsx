import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Authentication/firebase.config';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
    const logOut = () =>{
        signOut(auth)
        .then(res =>{
            toast.success("Log out successfull")
        })
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
    loginUser, logOut

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;