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
    const getUser = async() => {
        const fetcher = await fetch('http://localhost:8080/user/getUser', {
            credentials: 'include',
            method: 'GET'
        })
        const data = await fetcher.json()
        if(data.error){
            return {
                error: data.error
            }
        }
        auth(data.user)
        return {
            user: data.user
        }
    }
    return (
        <UserContext.Provider value={{user, auth, logout, getUser}}>
            {children}
        </UserContext.Provider>
    )
}
export {UserContext, UserContextProvider}