import ContactUs from "../../components/ContactUs/contactUs";
import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";

export default function ContactUsPage() {
  return (
    <div>
      <PromoBar />
      
      <Header />

      <ContactUs />

      <PaymentSection />

      <Footer />
    </div>
  );
}
