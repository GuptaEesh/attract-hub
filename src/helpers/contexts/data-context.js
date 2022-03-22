import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const DataContext = createContext()

const DataProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(async () => {
        setLoader(true)
        const apiData = await axios.get('/api/products')
        const data = await axios.get('/api/categories')
        setLoader(false)
        setCategories(data.data.categories)
        setData(
            [...apiData.data.products].map((item) => ({
                ...item,
                price: Math.round(item.price / 70),
            }))
        )
    }, [])
    return (
        <DataContext.Provider value={{ data, loader, categories }}>
            {children}
        </DataContext.Provider>
    )
}

const useData = () => useContext(DataContext)
export { useData, DataProvider }
