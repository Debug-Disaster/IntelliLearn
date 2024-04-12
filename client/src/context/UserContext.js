import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/getUser', {
                    credentials: 'include',
                    method: 'GET'
                });
                const data = await response.json();
                if (data.error) {
                    console.error(data.error);
                } else {
                    auth(data.user);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const auth = (userData) => {
        setUser(userData);
    };

    const logout = async() => {
            try {
                const response = await fetch('http://localhost:8080/user/logout', {
                    credentials: 'include',
                    method: 'POST'
                });
                const data = await response.json();
                if (data.error) {
                    console.error(data.error);
                } else {
                    setUser(null);
                    window.location.reload()
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
    };

    return (
        <UserContext.Provider value={{ user, auth, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserContext, UserContextProvider };