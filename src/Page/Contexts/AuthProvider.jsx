import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import axios from "axios";

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
        localStorage.removeItem("access-token"); // remove JWT on logout
        return signOut(auth);
    };

    // Observe auth state & generate JWT
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {
                try {
                    // Call backend JWT endpoint
                    const { data } = await axios.post(
                        "http://localhost:3000/jwt",
                        { email: currentUser.email }
                    );

                    // Save JWT in localStorage
                    localStorage.setItem("access-token", data.token);
                    console.log("JWT saved:", data.token);
                } catch (err) {
                    console.error("JWT generation failed:", err);
                }
            } else {
                localStorage.removeItem("access-token");
            }
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

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
