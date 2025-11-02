import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import ProductDetail from "../../components/Products/ProductDetail";
import RelatedProducts from "../../components/Products/RelatedProducts";

export default function ProductDetailsPage() {
  return (
    <>
      <PromoBar />

      <Header />

      <ProductDetail />

      <RelatedProducts />

      <PaymentSection />

      <Footer />
    </>
  );
}
