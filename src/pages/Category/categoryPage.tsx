import Category from "../../components/Category/category";
import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";

export default function CategoryPage() {
  return (
    <>
      <PromoBar />

      <Header />

      <Category />
      
      <PaymentSection />

      <Footer />
    </>
  );
}
