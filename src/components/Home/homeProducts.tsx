import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useGetProductsQuery } from "../../redux/products/apiProducts";
import type { ProductType } from "../../types/ProductType";
import { PackageSearch } from "lucide-react";

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

  return (
    <section className="overflow-hidden">
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {Array.from({ length: 4 }).map((_) => (
            <motion.div className="flex gap-4 px-4 select-none">
              {/* Spacer */}
              <div className="shrink-0 w-4 sm:w-8 md:w-12 lg:w-16" />

              {Array.from({ length: 1 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-52 sm:w-[250px] md:w-[300px] lg:w-[380px] xl:w-[420px]"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-lg animate-pulse">
                    {/* Image Skeleton */}
                    <div className="w-full h-[250px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] bg-gray-300 rounded-3xl" />

                    {/* Bottom overlay skeleton */}
                    <div className="absolute bottom-0 w-full p-4 bg-linear-to-t from-black/40 to-transparent">
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-1/3 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Spacer */}
              <div className="shrink-0 w-4 sm:w-8 md:w-12 lg:w-16" />
            </motion.div>
          ))}
        </div>
      ) : products?.products.length === 0 || isError ? (
        <div className="flex flex-col items-center py-20">
          <PackageSearch size={80} className="text-(--color-tiger) mb-4" />
          <p className="text-gray-500 font-medium">No products found</p>
        </div>
      ) : (
        <motion.div
          ref={sliderRef}
          className="flex gap-4 px-4 cursor-grab active:cursor-grabbing select-none"
          drag="x"
          dragConstraints={{ left: -dragWidth, right: 0 }}
        >
          {/* Spacer على اليسار */}
          <div className="shrink-0 w-4 sm:w-8 md:w-12 lg:w-16" />

          {products.products.map((product: ProductType) => (
            <div
              key={product.id}
              className="shrink-0 w-52 sm:w-[250px] md:w-[300px] lg:w-[380px] xl:w-[420px]"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg group hover:shadow-2xl transition-shadow">
                <img
                  src={product.images[0]}
                  srcSet={`
                    ${product.images[0]} 400w,
                    ${product.images[0]} 800w,
                    ${product.images[0]} 1200w
                 `}
                  sizes="(max-width: 640px) 400px, (max-width: 768px) 800px, 1200px"
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[250px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] object-cover pointer-events-none rounded-3xl"
                />

                {product.discountPercentage && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow-md">
                    {product.discountPercentage} OFF
                  </span>
                )}

                <div className="absolute bottom-0 w-full bg-linear-to-t from-black/80 to-transparent p-4 text-white flex flex-col gap-1">
                  <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                  <p className="font-bold">EGP {product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer على اليمين */}
          <div className="shrink-0 w-4 sm:w-8 md:w-12 lg:w-16" />
        </motion.div>
      )}
    </section>
  );
}
