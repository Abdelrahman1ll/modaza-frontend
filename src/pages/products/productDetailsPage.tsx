import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import ProductDetail from "../../components/Products/ProductDetail";
import ProductSlider from "../../components/Products/productSlider";
import Reviews from "../../components/Reviews/reviews";

export default function ProductDetailsPage() {
  return (
    <>
      <PromoBar />

      <Header />

      <BackButton />

      <ProductDetail />

      <Reviews />

      <ProductSlider />

      <PaymentSection />

      <Footer />
    </>
  );
}
