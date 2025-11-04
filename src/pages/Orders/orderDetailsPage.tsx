import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import OrderDetails from "../../components/Orders/orderDetails";

export default function OrderDetailsPage() {
  return (
    <>
      <PromoBar />

      <Header />
      
      <OrderDetails />

      <Footer />
    </>
  );
}
