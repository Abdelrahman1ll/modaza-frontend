import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";
import ProductForm from "../../components/Products/productForm";

export default function EditProductPage() {
     

  return (
    <>
      <PromoBar />

      <Header />

      <ProductForm mode="edit" />

      <Footer />
    </>
  );
}
