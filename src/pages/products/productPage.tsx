import { useState } from "react";
import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import FilterSidebar from "../../components/Products/FilterSidebar";
import Product from "../../components/Products/product";
export default function ProductsPage() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const handleClearAll = () => {
    setSelectedCats([]);
    setSelectedColors([]);
    setPriceRange([0, 1000]);
    console.log("All filters cleared");
  };
  return (
    <>
      <PromoBar />

      <Header />

      <h2
        className="text-3xl md:text-4xl font-bold mt-10 text-center mb-20"
        style={{ color: "var(--color-dark)" }}
      >
        Products
      </h2>

      <FilterSidebar
        onClearAll={handleClearAll}
        categories={["Category 1", "Category 2", "Category 3"]}
        colors={[
          { name: "Red", class: "bg-red-500", value: "red" },
          { name: "Blue", class: "bg-blue-500", value: "blue" },
          { name: "Green", class: "bg-green-500", value: "green" },
        ]}
        minPrice={0}
        maxPrice={1000}
        selectedCats={selectedCats}
        setSelectedCats={setSelectedCats}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <Product />

      <PaymentSection />

      <Footer />
    </>
  );
}
