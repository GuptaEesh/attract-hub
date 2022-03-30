import { createContext, useContext, useReducer } from 'react'
import { wishListItemsReducer } from '../reducers'
import { useAuth } from './auth-context'

const WishListContext = createContext(null)

function WishListProvider({ children }) {
    const { userData } = useAuth()
    const [wishList, dispatchWish] = useReducer(wishListItemsReducer, {
        wishListItems: userData.wishlist,
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
