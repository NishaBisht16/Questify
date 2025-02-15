import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("token");
    const [isToken, setIsToken] = useState(!!token);
    const [loggedInuser, setloggedinuser] = useState(() => {
        const savedUser = localStorage.getItem("loggedInUser");
        return savedUser ? JSON.parse(savedUser) : { FirstName: '', LastName: '' };
    });

    const loginUser = (token) => {
        if(token){
            localStorage.setItem("token",token);
            setIsToken(true);
        }
        else{
            setIsToken(false);
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        setIsToken(false);
    };
 
    const authorizedUser = (AuthoRizedLoggedInUser) => {
        console.log("User", AuthoRizedLoggedInUser);
        const { FirstName, LastName } = AuthoRizedLoggedInUser;
        setloggedinuser({ FirstName, LastName });
        // Save loggedInuser to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify({ FirstName, LastName }));
    };

    return (
        <AuthContext.Provider value={{ isToken, loginUser, logoutUser,authorizedUser ,loggedInuser}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
