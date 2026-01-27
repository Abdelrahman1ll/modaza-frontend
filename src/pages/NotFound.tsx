import { motion } from "framer-motion";
import { Home, Search, Package } from "lucide-react";
import { Link } from "react-router-dom";
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

      <div className="relative min-h-[70vh] flex items-center justify-center py-20 px-4">
        {/* Dynamic Radial Background */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(188,108,37,0.08)_0%,transparent_50%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-[120px] md:text-[180px] font-black text-(--color-tiger) leading-none tracking-tighter">
              404
            </h1>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/40 backdrop-blur-md border border-white/60 mb-6"
          >
            <Package size={40} className="text-(--color-pakistan)" />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-(--color-pakistan) mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-(--color-pakistan)/60 font-medium font-['Outfit'] max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-linear-to-r from-(--color-tiger) to-(--color-earth) text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-(--color-tiger)/20 flex items-center gap-2"
              >
                <Home size={18} />
                Go to Homepage
              </motion.button>
            </Link>

            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-(--color-pakistan) font-black uppercase tracking-widest text-xs hover:bg-white/60 transition-all flex items-center gap-2"
              >
                <Search size={18} />
                Browse Products
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <PaymentSection />
      <Footer />
    </>
  );
}
