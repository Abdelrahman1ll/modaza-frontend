import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import About from "./pages/About";
import BackgroundEffect from "./pages/Three/three";

export default function App() {
  return (
    <div >
      <BackgroundEffect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
