import { createContext, useContext } from "react";
import { useState } from "react";
const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const auth = (user) => {
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }
    return (
        <UserContext.Provider value={{user, auth, logout}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider