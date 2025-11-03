import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import Product from "../../components/Products/product";
export default function ProductsPage() {
  return (
    <>
      <PromoBar />

      <Header />

      <Product />

      <PaymentSection />

      <Footer />
    </>
  );
}
