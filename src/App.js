import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Nav } from './components/composite'
import { CartProvider } from './helpers/contexts/cart-context'
import { DataProvider } from './helpers/contexts/data-context'
import { ProductListing, Home, WishList, ProductPage, Cart } from './Pages'
import { WishListProvider } from './helpers/contexts/wishlist-context'
import { FilterProvider } from './helpers/contexts/filter-context'
function App() {
    return (
        <div className="App">
            <DataProvider>
                <FilterProvider>
                    <CartProvider>
                        <WishListProvider>
                            <Nav />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/products"
                                    element={<ProductListing />}
                                />
                                <Route
                                    path="/products/:id"
                                    element={<ProductPage />}
                                />
                                <Route path="/cart" element={<Cart />} />
                                <Route
                                    path="/wishlist"
                                    element={<WishList />}
                                />
                            </Routes>
                        </WishListProvider>
                    </CartProvider>
                </FilterProvider>
            </DataProvider>
        </div>
    )
}

export default App
