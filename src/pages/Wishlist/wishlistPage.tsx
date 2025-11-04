import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import Product from "../../components/Products/product";

export default function WishlistPage() {
  return (
    <div>
      <PromoBar />

      <Header />

        <h2
          className="text-3xl md:text-4xl font-bold mt-10 text-center"
          style={{ color: "var(--color-dark)" }}
        >
        My Wishlist
        </h2>

      <Product />

      <PaymentSection />

      <Footer />
    </div>
  );
}
