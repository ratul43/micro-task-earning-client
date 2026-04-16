import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../authentication/firebase/firebase"
import { AuthContext } from "./AuthContext"


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const googleProvider = new GoogleAuthProvider()

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

     const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

     const signInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


     const logOut = ()=>{
        setLoading(true)
        signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        updateUserProfile,
        logOut
    }

     return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
    
}

export default AuthProvider;