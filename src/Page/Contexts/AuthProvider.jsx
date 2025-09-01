import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout user
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Observe auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Loading false after checking
        });

        return () => unsubscribe();
    }, []);

    const userInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        logout,
        loading,
    };

    // Optional: Loading fallback
    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen text-green-500">
    //             Loading...
    //         </div>
    //     );
    // }

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
