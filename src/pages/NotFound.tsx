import BackButton from "../components/BackButton";
import Footer from "../components/Footer/footer";
import PaymentSection from "../components/Footer/PaymentSection";
import Header from "../components/Header/header";
import PromoBar from "../components/Header/PromoBar";

export default function NotFound() {
  return (
    <>
      <PromoBar />

      <Header />

      <BackButton />
      
      <div className="flex flex-col items-center justify-center mt-36">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl">Page Not Found</p>
      </div>

      <PaymentSection />

      <Footer />
    </>
  );
}
