import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import Checkout from "../../components/Orders/Checkout";

export default function CheckoutPage() {
  return (
    <div>
      <PromoBar />

      <Header />

      <Checkout />

      <Footer />
    </div>
  );
}
