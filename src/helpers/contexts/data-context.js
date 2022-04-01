import { createContext, useContext, useReducer, useState } from 'react'
import { dataReducer } from '../reducers'
const DataContext = createContext()

const DataProvider = ({ children }) => {
    const [dataHandler, dispatchData] = useReducer(dataReducer, {
        data: [],
        categories: [],
    })
    const [popups, setPopups] = useState({
        loader: false,
        toast: false,
        toastMessage: '',
        toastType: '',
    })
    return (
        <DataContext.Provider
            value={{ dataHandler, dispatchData, popups, setPopups }}
        >
            {children}
        </DataContext.Provider>
    )
}

const useData = () => useContext(DataContext)
export { useData, DataProvider }
