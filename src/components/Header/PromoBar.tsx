import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="w-full bg-(--color-primary) text-white text-center py-1 px-2 text-[11px] sm:text-xs md:text-sm font-medium flex items-center justify-center gap-1 sm:gap-1.5 shadow"
    >
      <Tag size={12} className="hidden sm:inline" />
      🎉 Get <span className="font-semibold">30% OFF</span> on all products — limited time!
      <Link
        to="/products"
        className="ml-2 underline text-(--color-dark) hover:text-(--color-light) transition"
      >
        Shop Now
      </Link>
    </motion.div>
  );
}
