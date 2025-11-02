import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/home";
import BackgroundEffect from "./components/Three/three";
import ProductsPage from "./pages/products/product";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";
import ProductDetailsPage from "./pages/products/productDetails";

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
      </Routes>
    </div>
  );
}
