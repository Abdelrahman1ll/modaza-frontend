import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer/footer";
import PaymentSection from "../../components/Footer/PaymentSection";
import Game from "../../components/Game/Game";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import HomeProducts from "../../components/Home/homeProducts";
import Main from "../../components/Home/main";
import Product from "../../components/Products/product";

export default function HomePage() {
  return (
    <>
      <PromoBar />

      <Header />

      <BackButton />

      <Main />

      <Game />

      <HomeProducts />

      <div className="text-center mb-16 space-y-4 px-4">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-(--color-tiger) block">
          Our Collection
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-(--color-pakistan) tracking-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
            Products
          </span>
        </h2>
      </div>

      <Product />

      <PaymentSection />

      <Footer />
    </>
  );
}
