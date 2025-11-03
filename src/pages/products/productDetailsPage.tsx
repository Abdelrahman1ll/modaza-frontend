import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import ProductDetail from "../../components/Products/productDetail";
import ProductSlider from "../../components/Products/productSlider";
import ReviewsProduct from "../../components/Products/reviewsProduct";

export default function ProductDetailsPage() {
  return (
    <>
      <PromoBar />

      <Header />

      <ProductDetail />

      <ReviewsProduct />

      <ProductSlider />

      <PaymentSection />

      <Footer />
    </>
  );
}
