import Cart from "../../components/Cart/cart";
import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";

export default function CartPage() {
  return (
    <>
      <PromoBar />

      <Header />

      <Cart />

      <PaymentSection />

      <Footer />
    </>
  );
}
