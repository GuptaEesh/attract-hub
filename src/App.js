import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AddressManage, Nav } from './components/composite'
import { CartProvider } from './helpers/contexts/cart-context'
import { useData } from './helpers/contexts/data-context'
import {
    CheckoutPage,
    ErrorPage,
    ProductListing,
    Home,
    WishList,
    ProductPage,
    OrdersPage,
    SearchPage,
    Cart,
    Login,
    SignUp,
    ProfilePage,
    ProfileInfo,
    Orders,
    Settings,
} from './Pages'
import { FilterProvider } from './helpers/contexts/filter-context'
import { MyToast } from './components/atomic'
import { RedirectAuth } from './helpers/route/redirect-auth'
import { RequireAuth } from './helpers/route/require-auth'

function App() {
    const location = useLocation()
    const { popups } = useData()
    const { toast, toastMessage, toastType } = popups
    const routeCheck =
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/*' ||
        location.pathname === '/order_summary'
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
                        <Route element={<RedirectAuth />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Route>
                        <Route path="/products" element={<ProductListing />} />
                        <Route
                            path="/search/:keyword"
                            element={<SearchPage />}
                        />
                        <Route path="/products/:id" element={<ProductPage />} />
                        <Route element={<RequireAuth />}>
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/wishlist" element={<WishList />} />
                            <Route
                                path="/checkout"
                                element={<CheckoutPage />}
                            />
                            <Route
                                path="/manage-address"
                                element={<AddressManage />}
                            />
                            <Route
                                path="/order_summary"
                                element={<OrdersPage />}
                            />
                            <Route path="/profile" element={<ProfilePage />}>
                                <Route
                                    path="/profile/"
                                    element={<ProfileInfo />}
                                />
                                <Route
                                    path="/profile/orders"
                                    element={<Orders />}
                                />
                                <Route
                                    path="/profile/settings"
                                    element={<Settings />}
                                />
                            </Route>
                        </Route>
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </CartProvider>
            </FilterProvider>
        </div>
    )
}

export default App
