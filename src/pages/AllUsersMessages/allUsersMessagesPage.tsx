import AllUsersMessages from "../../components/AllUsersMessages/allUsersMessages";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import PromoBar from "../../components/Header/PromoBar";


export default function AllUsersMessagesPage() {
    return (
      <>
        <PromoBar />
  
        <Header />
  
        <AllUsersMessages />
  
        <Footer />
      </>
    );
}