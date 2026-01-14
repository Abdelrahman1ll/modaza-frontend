import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
      className="relative w-full overflow-hidden bg-(--color-tiger) text-white shadow-sm"
    >
      {/* Animated gradient overlay */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto py-2 px-2 sm:px-4 flex items-center justify-center gap-x-2 gap-y-1 sm:gap-x-4 text-[9px] min-[400px]:text-[10px] sm:text-xs md:text-sm font-bold tracking-wide uppercase">
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm shrink-0">
          <Tag size={10} className="text-white/80" />
          <span className="hidden min-[350px]:inline">OFFER</span>
        </div>

        <p className="flex items-center gap-1 sm:gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
          🎉 Get{" "}
          <span className="text-(--color-pakistan) font-black">30% OFF</span>
          <span className="hidden sm:inline">on all products</span>
          <span className="hidden md:inline text-white/60 mx-1">—</span>
          <span className="text-white/90">limited time!</span>
        </p>

        <Link
          to="/products"
          className="group flex items-center gap-1 py-1 px-3 rounded-full bg-(--color-pakistan) text-white hover:bg-(--color-pakistan)/90 transition-all duration-300 shadow-sm shrink-0"
        >
          <span>Shop</span>
          <ArrowRight
            size={12}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </div>
    </motion.div>
  );
}
