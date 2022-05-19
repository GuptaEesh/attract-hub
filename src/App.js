import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AddressManage, Nav, PrivateRoute } from './components/composite'
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
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/products" element={<ProductListing />} />
                        <Route
                            path="/search/:keyword"
                            element={<SearchPage />}
                        />
                        <Route path="/products/:id" element={<ProductPage />} />
                        <Route
                            path="/cart"
                            element={
                                <PrivateRoute>
                                    <Cart />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/wishlist"
                            element={
                                <PrivateRoute>
                                    <WishList />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <PrivateRoute>
                                    <CheckoutPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/manage-address"
                            element={
                                <PrivateRoute>
                                    <AddressManage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/order_summary"
                            element={
                                <PrivateRoute>
                                    <OrdersPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        >
                            <Route
                                path="/profile/"
                                element={
                                    <PrivateRoute>
                                        <ProfileInfo />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile/orders"
                                element={
                                    <PrivateRoute>
                                        <Orders />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile/settings"
                                element={
                                    <PrivateRoute>
                                        <Settings />
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </CartProvider>
            </FilterProvider>
        </div>
    )
}

export default App
