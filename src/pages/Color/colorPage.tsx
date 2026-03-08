import BackButton from "../../components/BackButton";
import Color from "../../components/Color/color";
import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";

export default function ColorPage() {
  return (
    <>
      <PromoBar />

      <Header />

      <BackButton />

      <Color />

      <PaymentSection />

      <Footer />
    </>
  );
}
