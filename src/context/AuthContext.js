import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from '../firebase'
export const authContext = createContext()

export const useAuth = () =>{
    const context = useContext(authContext)
    if(!context) throw new Error('No hay provider')
    return context
}
export function AuthProvider ({children}){
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)

    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password)
    const login = (email, password)=> signInWithEmailAndPassword(auth, email, password)
         

    const logout = () =>{
        signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setloading(false)
        })
        return () => unsubscribe();
    }, [])
    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider()
        signInWithPopup(auth, googleProvider)
    }
    return(
        <authContext.Provider value={{signup, login, user, logout, loading,loginWithGoogle }}>
            {children}
        </authContext.Provider>
    )
}