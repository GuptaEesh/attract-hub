import { createContext, useContext, useReducer } from 'react'
import { wishListItemsReducer } from '../reducers'

const WishListContext = createContext(null)

function WishListProvider({ children }) {
    const [wishList, dispatchWish] = useReducer(wishListItemsReducer, {
        wishListItems: [],
    })
    const wishItems = wishList.wishListItems
    return (
        <WishListContext.Provider value={{ wishItems, dispatchWish }}>
            {children}
        </WishListContext.Provider>
    )
}

const useWishList = () => useContext(WishListContext)
export { useWishList, WishListProvider }
