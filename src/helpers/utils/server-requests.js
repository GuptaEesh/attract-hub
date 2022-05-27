import axios from 'axios'
import { alerts, immediateToastCloser, getConfig } from './server-helper'

const signUpHandler = async (e, setFormFields, login, formFields) => {
    const { name, email, password, confirmPass } = formFields
    e.preventDefault()
    try {
        if (password !== confirmPass) throw 'passwordError'
        setFormFields({ ...formFields, loader: true })
        const response = await axios.post('/api/auth/signup', {
            name,
            email,
            password,
        })
        setFormFields({ ...formFields, loader: false })
        login(response.data, 'signup')
    } catch (err) {
        setFormFields({
            ...formFields,
            error: true,
            message:
                err === 'passwordError'
                    ? "Passwords don't match"
                    : "It's not you it's us",
        })
        setTimeout(() => setFormFields({ ...formFields, error: false }), 1500)
    }
}

const loginHandler = async (e, setFormFields, login, formFields) => {
    const { email, password } = formFields
    e.preventDefault()
    try {
        setFormFields({ ...formFields, loader: true })
        const { data } = await axios.post('/api/auth/login', {
            email,
            password,
        })
        setFormFields({ ...formFields, loader: false })
        login(data)
    } catch (err) {
        setFormFields({ ...formFields, error: true })
        setTimeout(
            () =>
                setFormFields({
                    ...formFields,
                    error: false,
                }),
            1500
        )
    }
}

const getProducts = async (setPopups, dispatchData) => {
    try {
        setPopups((popups) => ({ ...popups, loader: true }))
        const data = await axios.get('/api/products')

        setPopups((popups) => ({ ...popups, loader: false }))

        dispatchData({
            type: 'ADD_PRODUCTS',
            payload: [...data.data.products].map((item) => ({
                ...item,
                price: Math.round(item.price / 70), //this is to convert backend money value to any currency just by converting it here.
            })),
        })
    } catch (error) {
        alerts('Server is down', 'danger-alert', setPopups)
    }
}

const getCategories = async (setPopups, dispatchData) => {
    try {
        setPopups((popups) => ({ ...popups, loader: true }))
        const data = await axios.get('/api/categories')
        setPopups((popups) => ({ ...popups, loader: false }))
        dispatchData({
            type: 'ADD_CATEGORIES',
            payload: data.data.categories,
        })
    } catch (error) {
        alerts('Server is down', 'danger-alert', setPopups)
    }
}

const addCartItem = async (product, dispatch, token, setPopup, setPopups) => {
    try {
        immediateToastCloser(setPopups)
        setPopup((popup) => ({ ...popup, cartloader: true }))
        const response = await axios.post(
            '/api/user/cart',
            {
                product,
            },
            getConfig(token)
        )
        setPopup((popup) => ({ ...popup, cartloader: false }))
        alerts(
            'Added to cart',
            'success-alert',
            setPopups,
            dispatch,
            response,
            'cart'
        )
    } catch (e) {
        alerts("Couldn't update cart", 'danger-alert', setPopups)
    }
}

const quantityHandler = async (e, cartItem, dispatch, token, setPopups) => {
    try {
        immediateToastCloser(setPopups)
        const response = await axios.post(
            `/api/user/cart/${cartItem._id}`,
            {
                action: {
                    type: 'increment',
                    payload: e.target.value,
                },
            },
            getConfig(token)
        )
        alerts(
            'Quantity updated',
            'success-alert',
            setPopups,
            dispatch,
            response,
            'cart'
        )
    } catch (err) {
        alerts("Couldn't update quantity", 'danger-alert', setPopups)
    }
}
const addWishItem = async (product, dispatch, token, setPopup, setPopups) => {
    try {
        immediateToastCloser(setPopups)
        setPopup((popup) => ({ ...popup, wishloader: true }))
        const response = await axios.post(
            '/api/user/wishlist',
            {
                product,
            },
            getConfig(token)
        )
        setPopup((popup) => ({ ...popup, wishloader: false }))
        alerts(
            'Added to wishlist',
            'success-alert',
            setPopups,
            dispatch,
            response,
            'wish'
        )
    } catch (e) {
        alerts("Couldn't add to wishlist", 'danger-alert', setPopups)
    }
}
const removeCartItem = async (dispatch, token, id, setPopup, setPopups) => {
    try {
        setPopup((popup) => ({ ...popup, cartloader: true }))
        const response = await axios.delete(
            `/api/user/cart/${id}`,

            getConfig(token)
        )
        setPopup((popup) => ({ ...popup, cartloader: false }))
        alerts(
            'Removed from cart',
            'danger-alert',
            setPopups,
            dispatch,
            response,
            'cart'
        )
    } catch (e) {
        alerts("Couldn't remove from cart", 'danger-alert', setPopups)
    }
}
const removeWishItem = async (dispatch, token, id, setPopup, setPopups) => {
    try {
        immediateToastCloser(setPopups)
        setPopup((popup) => ({ ...popup, wishloader: true }))
        const response = await axios.delete(
            `/api/user/wishlist/${id}`,

            getConfig(token)
        )
        setPopup((popup) => ({ ...popup, wishloader: false }))
        alerts(
            'Removed from wishlist',
            'mild-alert',
            setPopups,
            dispatch,
            response,
            'wish'
        )
    } catch (e) {
        alerts("Couldn't add to wishlist", 'danger-alert', setPopups)
    }
}

export {
    signUpHandler,
    loginHandler,
    getProducts,
    getCategories,
    addCartItem,
    quantityHandler,
    addWishItem,
    removeCartItem,
    removeWishItem,
}
