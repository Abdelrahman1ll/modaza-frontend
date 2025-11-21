import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, PackageSearch, Heart } from "lucide-react";

import { Link } from "react-router-dom";
import UseWishlist from "./useWishlist";

export default function Wishlist() {
  const {
    handleToggleWishlist,
    isFav,
    isLoading,
    currentImage,
    nextImage,
    prevImage,
    user,
    data,
  } = UseWishlist();
  return (
    <>
      <div className="py-14 m-4">
        <section className="max-w-7xl mx-auto">
          {/* شبكة المنتجات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
            ) : data?.wishlist?.length ? (
              data?.wishlist.map((wishl: any, index: number) => {
                const imgIndex = currentImage[wishl?.product?.id] || 0;
                return (
                  <motion.div
                    key={index}
                    className="bg-transparent transition-all duration-300 flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    {/* الصورة */}
                    <div className="relative rounded-3xl overflow-hidden group">
                      {/* سلايدر الصور */}
                      <motion.img
                        key={imgIndex}
                        src={wishl?.product?.images[imgIndex]}
                        alt={wishl?.product?.name}
                        className="w-full h-[460px] rounded-3xl object-cover transition-transform duration-500"
                        whileHover={{ scale: 1.05 }}
                      />

                      {/* أزرار السلايدر */}
                      {wishl?.product?.images.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              prevImage(
                                wishl?.product?.id,
                                wishl?.product.images.length
                              )
                            }
                            className="absolute left-3 text-(--color-tiger) top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft
                              size={20}
                              className="text-(-color-tiger)"
                            />
                          </button>

                          <button
                            onClick={() =>
                              nextImage(
                                wishl?.product?.id,
                                wishl?.product.images.length
                              )
                            }
                            className="absolute right-3 text-(--color-tiger) top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}

                      {/* زرار القلب */}
                      <motion.button
                        onClick={() => handleToggleWishlist(wishl?.product?.id)}
                        whileTap={{ scale: 0.8 }}
                        className="absolute top-4 right-4 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500"
                      >
                        <motion.div
                          initial={false}
                          animate={{
                            scale: isFav[wishl?.product.id] ? 1.3 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Heart
                            size={24}
                            color={
                              isFav[wishl?.product.id] ? "#BC6C25" : "black"
                            }
                            fill={
                              isFav[wishl?.product.id]
                                ? "#BC6C25"
                                : "transparent"
                            }
                          />
                        </motion.div>
                      </motion.button>
                      {/* الخصم */}
                      {wishl?.product.discountPercentage !== 0 && (
                        <span className="absolute top-4 left-4 bg-(--color-tiger) text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                          {wishl?.product.discountPercentage.toFixed(0)}% OFF
                        </span>
                      )}
                    </div>

                    {/* التفاصيل */}
                    <div className="p-2 flex flex-col gap-4 grow">
                      {/* الاسم والسعر */}
                      <div className="flex items-center justify-between">
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: "var(--color-dark)" }}
                        >
                          {wishl?.product.name}
                        </h3>

                        <div className="flex flex-col items-end">
                          {wishl?.product.discountPercentage !== 0 ? (
                            <span className="text-gray-400 line-through text-sm">
                              {wishl?.product.promotionalPrice.toFixed(2)} EGP
                            </span>
                          ) : null}

                          <span
                            className="text-lg font-bold"
                            style={{ color: "var(--color-pakistan)" }}
                          >
                            {wishl?.product.price.toFixed(2)} EGP
                          </span>
                        </div>
                      </div>

                      {/* الأزرار */}
                      <div className="flex gap-4 w-full">
                        {/* زر عرض التفاصيل */}
                        <Link
                          to={`/products-details/${wishl?.product.id}`}
                          className="flex-2"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-2 px-4 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all"
                          >
                            View Details
                          </motion.button>
                        </Link>

                        {/* زر التعديل (يظهر فقط لو المستخدم مش "user") */}
                        {user && user.user.role !== "user" && (
                          <Link
                            to={`/edit-product/${wishl?.product.id}`}
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
                  No Wishlists found
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
