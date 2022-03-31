import axios from 'axios'
import { getConfig } from './get-config'

const useAddWishItem = async (product, dispatch, token, setPopup) => {
    try {
        setPopup((popup) => ({ ...popup, wishloader: true }))
        const response = await axios.post(
            '/api/user/wishlist',
            {
                product,
            },
            getConfig(token)
        )
        setPopup((popup) => ({ ...popup, wishloader: false }))
        dispatch({
            type: 'MANIPULATE_WISHLIST',
            payload: response.data.wishlist,
        })
    } catch (e) {
        console.log(e)
    }
}

export { useAddWishItem }
