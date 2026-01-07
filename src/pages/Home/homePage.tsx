import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import HomeProducts from "../../components/Home/homeProducts";
import Main from "../../components/Home/main";
import Product from "../../components/Products/product";

export default function HomePage() {
  return (
    <>
      <PromoBar />

      <Header />

      <Main />

      <HomeProducts />

      <h2
        className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-8 text-center mb-8  md:mb-16"
        style={{ color: "var(--color-dark)" }}
      >
        Products
      </h2>

      <Product />

      <PaymentSection />

      <Footer />
    </>
  );
}
