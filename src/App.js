import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav, PrivateRoute } from './components/composite'
import { CartProvider } from './helpers/contexts/cart-context'
import { DataProvider } from './helpers/contexts/data-context'
import {
    ProductListing,
    Home,
    WishList,
    ProductPage,
    Cart,
    Login,
    SignUp,
} from './Pages'
import { FilterProvider } from './helpers/contexts/filter-context'
function App() {
    const location = useLocation()
    const routeCheck =
        location.pathname === '/login' || location.pathname === '/signup'
    return (
        <div className="App">
            <DataProvider>
                <FilterProvider>
                    <CartProvider>
                        {!routeCheck && <Nav />}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route
                                path="/products"
                                element={<ProductListing />}
                            />
                            <Route
                                path="/products/:id"
                                element={<ProductPage />}
                            />
                            <Route
                                path="/cart"
                                element={<PrivateRoute component={<Cart />} />}
                            />
                            <Route
                                path="/wishlist"
                                element={
                                    <PrivateRoute component={<WishList />} />
                                }
                            />
                        </Routes>
                    </CartProvider>
                </FilterProvider>
            </DataProvider>
        </div>
    )
}

export default App
