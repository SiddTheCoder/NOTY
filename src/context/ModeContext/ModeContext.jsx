import { createContext, useContext, useState } from 'react'

const ModeContext = createContext()

const ModeContextProvider = ({children}) => {
    const [mode, setMode] = useState(null)

    return (
        <ModeContext.Provider value={{mode,setMode}}>
            {children}
        </ModeContext.Provider>
    )

}

export const useMode = () => useContext(ModeContext)

export default ModeContextProvider