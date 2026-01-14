import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackButton() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility based on scroll position if needed,
      // but usually back buttons should remain visible or fade out gently.
      if (window.scrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.8 }}
          whileHover={{
            scale: 1.15,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={goBack}
          className="fixed top-32 left-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/60 backdrop-blur-md border border-(--color-tiger)/20 shadow-lg cursor-pointer transition-colors duration-300 group"
          title="الرجوع للصفحة السابقة"
        >
          <ArrowLeft
            size={20}
            className="text-(--color-tiger) group-hover:scale-110 transition-transform duration-300"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
