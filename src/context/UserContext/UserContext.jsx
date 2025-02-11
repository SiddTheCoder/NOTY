import { createContext, useContext, useState } from "react";

const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        image: '',
        bio: ''
    })


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)

export {UserContextProvider}


