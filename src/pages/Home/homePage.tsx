import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import HomeProducts from "../../components/Home/homeProducts";
import Main from "../../components/Home/main";

export default function HomePage() {
  return (
    <>
    <PromoBar />
    
      <Header />

      <Main />

      <HomeProducts />

      <PaymentSection />

      <Footer />
    </>
  );
}
