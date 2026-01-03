import ContactUs from "../../components/QuickLinks/contactUs";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import PaymentSection from "../../components/Footer/PaymentSection";

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
