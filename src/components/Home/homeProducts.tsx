import { motion, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useGetProductsQuery } from "../../redux/products/apiProducts";
import type { ProductType } from "../../types/ProductType";
import { PackageSearch } from "lucide-react";
import { getCloudinaryUrl, getCloudinarySrcSet } from "../../utils/cloudinary";
import { Link } from "react-router-dom";

/**
 * HomeProducts: Horizontal draggable slider for featured products.
 * منتجات الصفحة الرئيسية: شريط عرض جانبي للمنتجات المميزة.
 */
export default function HomeProducts() {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery("/products");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const totalScrollWidth = container.scrollWidth;
      const visibleWidth = container.offsetWidth;
      setDragWidth(totalScrollWidth - visibleWidth);
    }
  }, [products]);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -right-24 w-64 h-64 bg-(--color-tiger)/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-64 h-64 bg-(--color-pakistan)/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-(--color-tiger) mb-4"
        >
          Curated Styles
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-(--color-pakistan) tracking-tight mb-4"
        >
          Trending Now
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-(--color-dark)/60 font-medium max-w-sm leading-relaxed"
        >
          Discover our most-loved pieces, handpicked for you to elevate your
          daily expression.
        </motion.p>
      </div>

      {isLoading ? (
        <div className="flex gap-6 px-4 md:px-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-100 animate-pulse aspect-4/5 shadow-sm">
                <div className="absolute bottom-0 w-full p-8 bg-black/5 flex flex-col gap-3">
                  <div className="h-4 w-2/3 bg-gray-200 rounded-lg" />
                  <div className="h-4 w-1/3 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products?.products.length === 0 || isError ? (
        <div className="flex flex-col items-center py-20 relative z-10">
          <div className="w-20 h-20 bg-(--color-tiger)/10 rounded-full flex items-center justify-center mb-6">
            <PackageSearch size={40} className="text-(--color-tiger)" />
          </div>
          <p className="text-(--color-dark)/70 font-black uppercase tracking-widest text-xs">
            No products found
          </p>
        </div>
      ) : (
        <motion.div
          ref={sliderRef}
          className="flex gap-6 pr-8 md:pr-16 active:cursor-grabbing select-none"
          drag="x"
          dragConstraints={{ left: -dragWidth - 100, right: 100 }}
          dragElastic={0.1}
        >
          {/* Enhanced horizontal spacing */}
          <div className="shrink-0 w-6 md:w-16 lg:w-24" />

          {products?.products.map((product: ProductType) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="shrink-0 w-[240px] sm:w-[320px] md:w-[380px] lg:w-[420px]"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.1)] group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:-translate-y-2">
                <motion.div className="w-full h-full relative overflow-hidden">
                  <img
                    src={getCloudinaryUrl(product.images[0], { width: 600 })}
                    srcSet={getCloudinarySrcSet(product.images[0])}
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 450px, 600px"
                    alt={product.name}
                    width={600}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover pointer-events-none rounded-[2.5rem] transform transition-transform duration-1000 group-hover:scale-110"
                    style={{ aspectRatio: "4/5" }}
                  />

                  {/* Glassmorphism Badge */}
                  {product.discountPercentage && (
                    <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg z-10">
                      {product.discountPercentage} OFF
                    </div>
                  )}

                  {/* Glassmorphism Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="relative p-6 rounded-4xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl overflow-hidden group/info">
                      <div className="absolute inset-0 bg-white/10 group-hover/info:bg-white/20 transition-colors" />
                      <div className="relative z-10 flex flex-col gap-1">
                        <h3 className="font-black text-(--color-pakistan) text-lg truncate mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-(--color-tiger) text-base">
                            EGP {product.price.toLocaleString()}
                          </p>
                          <Link to={`/products-details/${product.id}`}>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="bg-(--color-pakistan) text-white p-2 rounded-full shadow-lg"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </motion.div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Spacer على اليمين */}
          <div className="shrink-0 w-12 md:w-32 lg:w-48" />
        </motion.div>
      )}
    </section>
  );
}
