import { PackageSearch } from "lucide-react";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "../../redux/products/apiProducts";
import type { ProductType } from "../../types/ProductType";
import { useNavigate } from "react-router-dom";
import { getCloudinaryUrl, getCloudinarySrcSet } from "../../utils/cloudinary";

/**
 * ProductSlider (now ProductGrid): A clean grid of products for the details page.
 * شبكة المنتجات: عرض نظيف للمنتجات لصفحة التفاصيل.
 */
export default function ProductSlider() {
  const navigate = useNavigate();

  const { data: products, isLoading } = useGetProductsQuery("/products");
  const productList = Array.isArray(products)
    ? products
    : products?.products || [];

  return (
    <div className="relative w-full py-10 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-(--color-tiger)/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-(--color-pakistan)/5 rounded-full blur-[100px]" />
      </div>
      <div className="w-full max-w-[1300px] px-4 md:px-8 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center"
              >
                <div className="rounded-4xl shadow-sm w-full max-w-[340px] aspect-4/5 bg-gray-100/50 animate-pulse" />
              </div>
            ))
          ) : productList.length ? (
            productList.map((product: ProductType) => (
              <div
                key={product?.id}
                className="flex flex-col items-center justify-center perspective-1000"
              >
                <motion.div
                  className="relative group/card w-full max-w-[340px] cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    navigate(`/products-details/${product?.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {/* Card Main */}
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-white ring-1 ring-black/5 aspect-4/5 isolate">
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
                    <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col items-center text-center">
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                          Featured
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-white tracking-tight mb-1 drop-shadow-lg">
                        {product?.name}
                      </h3>

                      <div className="flex items-center justify-center gap-2 text-white/90">
                        <span className="text-lg font-medium">
                          {product?.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                          EGP
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center p-20">
              <div className="text-center opacity-50">
                <PackageSearch size={48} className="mx-auto mb-4" />
                <p>No products found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
