import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import "./AddToCartButton.css";

/**
 * AddToCartButton: A reusable button component with loading state for cart operations.
 */
export default function AddToCartButton({
  addToCart,
}: {
  addToCart: () => void;
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    addToCart();
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group/btn relative flex items-center justify-center gap-3 flex-1 h-14 rounded-2xl font-black text-white text-lg overflow-hidden transition-all duration-300 shadow-xl hover:shadow-(--color-tiger)/20"
      style={{
        background: clicked
          ? "var(--color-tiger)"
          : "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
      }}
    >
      {/* Premium Shimmer Effect */}
      <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />

      {/* Slide Overlay for Click State */}
      <span
        className={`absolute inset-0 h-full w-full rounded-2xl transition-transform duration-2000 ease-out ${
          clicked ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      ></span>

      <span className="relative z-10 tracking-tight">Add to Cart</span>
      <ShoppingCart
        size={24}
        strokeWidth={2.5}
        className={`relative z-10 transition-all duration-500 ${
          clicked
            ? "translate-x-1 rotate-12 scale-110"
            : "group-hover/btn:translate-x-1"
        }`}
      />
    </motion.button>
  );
}
