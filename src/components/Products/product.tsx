import { motion } from "framer-motion";
import { PackageSearch, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductType } from "../../types/ProductType";
import useProduct from "./useProduct";

export default function Product() {
  const {
    products,
    isLoading,
    isFav,
    handleToggleWishlist,
    hoveredIds,
    setHoveredIds,
    user,
  } = useProduct();
  return (
    <div className="m-4">
      <section className="max-w-7xl mx-auto">
        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-transparent flex flex-col animate-pulse"
              >
                <div className="w-full h-[460px] rounded-3xl bg-gray-200 mb-4" />
                <div className="flex justify-between mb-2">
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="flex flex-col items-end">
                    <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : products?.products?.length ? (
            products?.products.map((product: ProductType, index: number) => {
              const isHovered = hoveredIds[product.id] || false;
              return (
                <motion.div
                  key={index}
                  className="bg-transparent transition-all duration-300 flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  {/* الصورة */}

                  <div className="relative rounded-3xl overflow-hidden group">
                    {/* سلايدر الصور */}
                    <Link
                      to={`/products-details/${product?.id}`}
                      onMouseEnter={() =>
                        setHoveredIds((prev) => ({
                          ...prev,
                          [product.id]: true,
                        }))
                      }
                      onMouseLeave={() =>
                        setHoveredIds((prev) => ({
                          ...prev,
                          [product.id]: false,
                        }))
                      }
                    >
                      <div className="relative w-full h-[560px] max-[1090px]:h-[480px] overflow-hidden rounded-3xl">
                        {/* الصورة الأولى */}
                        <motion.img
                          src={product.images[0]}
                          alt={product?.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          animate={{
                            opacity: isHovered ? 0 : 1,
                            scale: isHovered ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />

                        {/* الصورة الثانية */}
                        <motion.img
                          src={product.images[1]}
                          alt={product?.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1.15 : 1,
                            z: isHovered ? 10 : 0,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </Link>
                    {/* زرار القلب */}
                    <motion.button
                      onClick={() => handleToggleWishlist(product?.id)}
                      whileTap={{ scale: 0.8 }}
                      className="absolute top-4 right-4 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <motion.div
                        initial={false}
                        animate={{ scale: isFav[product.id] ? 1.3 : 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Heart
                          size={24}
                          color={isFav[product.id] ? "#BC6C25" : "black"}
                          fill={isFav[product.id] ? "#BC6C25" : "transparent"}
                        />
                      </motion.div>
                    </motion.button>
                    {/* الخصم */}
                    {product.discountPercentage !== 0 && (
                      <span className="absolute top-4 left-4 bg-(--color-tiger) text-white text-sm font-bold px-2 py-0.5 rounded-full shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                        {product.discountPercentage.toFixed(0)}% off
                      </span>
                    )}
                  </div>

                  {/* التفاصيل */}
                  <div className="p-1 flex flex-col gap-4 grow">
                    {/* الاسم والسعر */}
                    <div className="">
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-dark)" }}
                      >
                        {product.name}
                      </h3>

                      <div>
                        {product.discountPercentage !== 0 ? (
                          <span className="text-gray-400 line-through text-lg">
                            {product.promotionalPrice.toFixed(2)} EGP
                          </span>
                        ) : null}

                        <span
                          className="text-lg font-bold ml-2"
                          style={{ color: "var(--color-pakistan)" }}
                        >
                          {product.price.toFixed(2)} EGP
                        </span>
                      </div>
                    </div>

                    {/* الأزرار */}
                    <div className="w-full">
                      {/* زر التعديل (يظهر فقط لو المستخدم مش "user") */}
                      {user && user.user.role !== "user" && (
                        <Link
                          to={`/edit-product/${product.id}`}
                          className="flex-1"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-2 px-4 rounded-full font-semibold bg-(--color-pakistan) hover:bg-(--color-dark) text-white shadow-md transition-all"
                          >
                            Edit
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <PackageSearch
                size={100}
                className="text-(--color-tiger) mb-6 animate-bounce"
              />
              <p className="text-gray-500 text-lg font-medium">
                No products found
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
