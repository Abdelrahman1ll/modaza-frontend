import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import BackgroundEffect from "./components/Three/three";
import Products from "./pages/products/product";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";

export default function App() {
  return (
    <div>
      <BackgroundEffect />
      <ScrollToTop />
      <BackButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}
