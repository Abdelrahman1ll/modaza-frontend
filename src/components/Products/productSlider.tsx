import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "../../redux/products/apiProducts";
import type { ProductType } from "../../types/ProductType";
import { useNavigate } from "react-router-dom";
import { getCloudinaryUrl, getCloudinarySrcSet } from "../../utils/cloudinary";

/**
 * ProductSlider: Horizontal draggable slider for featured products.
 * منزلق المنتجات: منزلق أفقي قابل للسحب للمنتجات المميزة.
 */
export default function ProductSlider() {
  const navigate = useNavigate();

  const { data: products, isLoading } = useGetProductsQuery("/products");

  // Persist index state to restore position when navigating back
  const [index, setIndex] = useState(() => {
    const saved = sessionStorage.getItem("product-slider-index");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isGrabbing, setIsGrabbing] = useState(false);

  // Sync index to session storage
  useEffect(() => {
    sessionStorage.setItem("product-slider-index", index.toString());
  }, [index]);

  // Validate index against loaded products
  useEffect(() => {
    if (products?.products && index >= products.products.length) {
      setIndex(0);
    }
  }, [products, index]);

  const next = () => {
    if (products?.products && index < products.products.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full py-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-(--color-tiger)/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-(--color-pakistan)/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation Buttons - Premium Glass */}
      <div className="absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-50 px-4 max-w-7xl mx-auto w-full">
        <motion.button
          whileHover={index > 0 ? { scale: 1.1, x: -4 } : {}}
          whileTap={index > 0 ? { scale: 0.9 } : {}}
          onClick={prev}
          disabled={index === 0}
          className={`pointer-events-auto hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-(--color-tiger) shadow-lg transition-all duration-300 group ${
            index === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:shadow-xl hover:bg-white/20 cursor-pointer"
          }`}
        >
          <ChevronLeft
            size={28}
            strokeWidth={2}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </motion.button>

        <motion.button
          whileHover={
            products?.products && index < products.products.length - 1
              ? { scale: 1.1, x: 4 }
              : {}
          }
          whileTap={
            products?.products && index < products.products.length - 1
              ? { scale: 0.9 }
              : {}
          }
          onClick={next}
          disabled={
            !products?.products || index >= products.products.length - 1
          }
          className={`pointer-events-auto hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-(--color-tiger) shadow-lg transition-all duration-300 group ${
            !products?.products || index >= products.products.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:shadow-xl hover:bg-white/20 cursor-pointer"
          }`}
        >
          <ChevronRight
            size={28}
            strokeWidth={2}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </motion.button>
      </div>

      {/* Slider Container */}
      <div className="w-full max-w-[1400px] overflow-visible z-10">
        <motion.div
          className={`flex ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
          animate={{ x: `-${index * 100}%` }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
            mass: 1.2,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onPointerDown={() => setIsGrabbing(true)}
          onPointerUp={() => setIsGrabbing(false)}
          onPointerLeave={() => setIsGrabbing(false)}
          onDragEnd={(_, info) => {
            setIsGrabbing(false);
            if (info.offset.x < -30 && info.velocity.x < 0) next();
            else if (info.offset.x > 30 && info.velocity.x > 0) prev();
          }}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] flex flex-col items-center justify-center p-4 md:p-8"
              >
                <div className="rounded-4xl shadow-sm w-full max-w-sm h-[500px] bg-gray-100/50 animate-pulse" />
              </div>
            ))
          ) : products?.products.length ? (
            products?.products.map((product: ProductType, i: number) => (
              <div
                key={product?.id}
                className="min-w-full flex flex-col items-center justify-center p-4 md:p-8 perspective-1000"
              >
                <motion.div
                  className="relative group/card w-full max-w-[340px]"
                  animate={{
                    scale: i === index ? 1 : 0.92,
                    opacity: i === index ? 1 : 0.6,
                    rotateY: i === index ? 0 : i > index ? -5 : 5,
                    z: i === index ? 0 : -50,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                  }}
                  onClick={() => {
                    if (!isGrabbing) {
                      navigate(`/products-details/${product?.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {/* Card Main */}
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-(--color-tiger)/5 ring-1 ring-black/5 aspect-4/5 isolate">
                    {/* Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={getCloudinaryUrl(product?.images[0], {
                          width: 600,
                        })}
                        srcSet={getCloudinarySrcSet(product?.images[0])}
                        sizes="(max-width: 640px) 100vw, 400px"
                        alt={product?.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-50 transition-opacity duration-500" />
                    </div>

                    {/* Floating Info - Glassmorphism */}
                    <div className="absolute bottom-0 inset-x-0 p-8 z-10 flex flex-col items-center text-center">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                            Featured
                          </span>
                        </div>

                        <h3 className="text-3xl font-black text-white tracking-tight mb-2 drop-shadow-lg">
                          {product?.name}
                        </h3>

                        <div className="flex items-center justify-center gap-2 text-white/90">
                          <span className="text-xl font-medium">
                            {product?.price.toLocaleString()}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                            EGP
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))
          ) : (
            <div className="min-w-full flex items-center justify-center p-20">
              <div className="text-center opacity-50">
                <PackageSearch size={48} className="mx-auto mb-4" />
                <p>No products found</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Pagination Indicators */}
      <div className="flex items-center gap-3 mt-8 z-20">
        {products?.products.slice(0, 10).map((_: ProductType, i: number) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative flex items-center justify-center w-10 h-10 cursor-pointer"
          >
            <motion.div
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-(--color-tiger)"
                  : "w-2 bg-gray-300 group-hover:bg-gray-400 group-hover:w-4"
              }`}
              layoutId="slider-indicator"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
