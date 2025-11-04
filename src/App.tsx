import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/homePage";
import BackgroundEffect from "./components/Three/three";
import ProductsPage from "./pages/products/productPage";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";
import ProductDetailsPage from "./pages/products/productDetailsPage";
import CartPage from "./pages/Cart/cartPage";
import WishlistPage from "./pages/Wishlist/wishlistPage";
import ProfilePage from "./pages/Profile/profilePage";
import OrdersPage from "./pages/Orders/ordersPage";
import OrderDetailsPage from "./pages/Orders/orderDetailsPage";
import AddProductPage from "./pages/products/addProductPage";
import EditProductPage from "./pages/products/editProductPage";

export default function App() {
  return (
    <div>
      <BackgroundEffect />
      <ScrollToTop />
      <BackButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products-details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
      </Routes>
    </div>
  );
}
