import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav, PrivateRoute } from './components/composite'
import { CartProvider } from './helpers/contexts/cart-context'
import { useData } from './helpers/contexts/data-context'
import {
    ErrorPage,
    ProductListing,
    Home,
    WishList,
    ProductPage,
    Cart,
    Login,
    SignUp,
} from './Pages'
import { FilterProvider } from './helpers/contexts/filter-context'
import { MyToast } from './components/atomic'
function App() {
    const location = useLocation()
    const { popups } = useData()
    const { toast, toastMessage, toastType } = popups
    const routeCheck =
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/*'
    return (
        <div className="App">
            <FilterProvider>
                <CartProvider>
                    {!routeCheck && <Nav />}
                    {toast && (
                        <MyToast message={toastMessage} alertType={toastType} />
                    )}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/products" element={<ProductListing />} />
                        <Route path="/products/:id" element={<ProductPage />} />
                        <Route
                            path="/cart"
                            element={<PrivateRoute component={<Cart />} />}
                        />
                        <Route
                            path="/wishlist"
                            element={<PrivateRoute component={<WishList />} />}
                        />
                    </Routes>
                </CartProvider>
            </FilterProvider>
        </div>
    )
}

export default App
