import { motion } from "framer-motion";
import { useGetProductsQuery } from "../../redux/products/apiProducts";
import type { ProductType } from "../../types/ProductType";
import { Link } from "react-router-dom";
import { PackageSearch } from "lucide-react";

export default function HomeProducts() {
  const { data: products, isLoading } = useGetProductsQuery("");
  return (
    <div>
      <h2 className="text-3xl md:text-4xl py-2 font-bold mb-8 mt-8 text-center">
        Latest Products
      </h2>
      <section className="max-w-7xl mx-auto px-6 py-2 bg-transparent">
        <div
          className="
  grid
  grid-cols-3
  max-[1069px]:grid-cols-2
  max-[639px]:grid-cols-1
  gap-8
"
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-full h-[450px] bg-gray-300 rounded-3xl mb-4" />
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
                <div className="h-6 w-1/2 bg-gray-300 rounded" />
                <div className="h-10 w-full bg-gray-400 rounded-full mt-2" />
              </div>
            ))
          ) : products?.products.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <PackageSearch
                size={100}
                className="text-(--color-tiger) mb-6 animate-bounce"
              />
              <p className="text-gray-500 text-lg font-medium">
                No products found
              </p>
            </div>
          ) : (
            products?.products.map((product: ProductType) => {
              return (
                <div key={product?.id}>
                  <Link to={`/products-details/${product?.id}`}>
                    <motion.div
                      key={product?.id}
                      className="relative overflow-hidden rounded-3xl cursor-pointer group shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={product?.images[0]}
                        alt={product?.name}
                        className="w-full h-[480px] object-cover rounded-3xl"
                      />

                      {product?.discountPercentage && (
                        <span className="absolute top-4 left-4 bg-red-500 text-(--color-cornsilk) text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                          {product?.discountPercentage} OFF
                        </span>
                      )}

                      <div className="absolute bottom-0 w-full bg-linear-to-t from-black/70 via-black/20 to-transparent p-4 text-white flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-(--color-tiger)">
                          {product?.name}
                        </h3>
                        <p className="text-lg font-bold text-(--color-tiger)">
                          EGP {product?.price.toFixed(2)}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="mt-2 py-2 px-4 bg-(--color-tiger) text-white rounded-full font-semibold shadow-md hover:bg-black transition-all"
                        >
                          Shop Now
                        </motion.button>
                      </div>

                      <motion.div className="absolute inset-0 bg-black/25 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
