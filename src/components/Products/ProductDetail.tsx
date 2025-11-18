import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, PackageSearch } from "lucide-react";
import type { ProductSizeType } from "../../types/ProductType";
import MotionZoomImage from "./ImageZoom";
import Signup from "../Signup/signup";
import useProductDetail from "./useProductDetail";
export default function ProductDetail() {
  const {
    product,
    isFav,
    handleToggleWishlist,
    mainImage,
    handleNext,
    handlePrev,
    quantity,
    increase,
    decrease,
    percentstock,
    getColor,
    errors,
    addToCart,
    selectedSize,
    setSelectedSize,
    setShowSignup,
    isLoading,
    showSignup,
    setCurrentIndex,
  } = useProductDetail();
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 m-4 mt-12">
          {/* الجزء الأيسر skeleton */}
          <div className="w-full md:w-1/2 animate-pulse flex flex-col gap-4">
            <div className="w-full h-[450px] md:h-[800px] rounded-2xl bg-gray-200" />
            <div className="flex gap-3 mt-4 flex-wrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 rounded-xl bg-gray-300" />
              ))}
            </div>
          </div>

          {/* الجزء الأيمن skeleton */}
          <div className="md:w-1/2 flex flex-col gap-6 animate-pulse">
            <div className="h-10 w-3/4 bg-gray-200 rounded"></div>{" "}
            {/* اسم المنتج */}
            <div className="flex items-baseline gap-4">
              <div className="h-8 w-20 bg-gray-200 rounded"></div> {/* السعر */}
              <div className="h-6 w-16 bg-gray-200 rounded"></div>{" "}
              {/* السعر القديم */}
              <div className="h-6 w-12 bg-gray-300 rounded-full"></div>{" "}
              {/* النسبة */}
            </div>
            <div className="h-20 w-full bg-gray-200 rounded"></div> {/* وصف */}
            <div>
              <div className="flex gap-3 flex-wrap">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-10 w-20 bg-gray-300 rounded-full" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div>
            <div className="mt-4 w-full">
              <div className="flex justify-between mb-1">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden"></div>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="h-12 flex-1 bg-gray-300 rounded-full"></div>{" "}
              {/* زر Add to Cart */}
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>{" "}
              {/* زر القلب */}
            </div>
          </div>
        </div>
      ) : product === null ? (
        <div className="col-span-full flex flex-col items-center justify-center py-20">
          <PackageSearch
            size={100}
            className="text-(--color-tiger) mb-6 animate-bounce"
          />
          <p className="text-gray-500 text-lg font-medium">
            Sorry, this product is not available.
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 m-4 mt-12">
          <motion.div
            className="relative rounded-t-3xl overflow-hidden  w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* الصورة الرئيسية */}
            <MotionZoomImage mainImage={mainImage} />

            {/* أسهم التنقل */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white hover:bg-opacity-90 text-(--color-tiger) p-2 rounded-full transition cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white hover:bg-opacity-90 text-(--color-tiger) p-2 rounded-full transition cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>

            {/* الصور المصغّرة */}
            <div className="flex justify-center flex-wrap gap-3 mt-4 pb-2">
              {Array.isArray(product?.images) &&
                product?.images?.map((img: string, index: number) => (
                  <motion.img
                    key={index}
                    src={img || "/photo-1495385794356-15371f348c31.jpeg"}
                    alt="Thumbnail"
                    onClick={() => setCurrentIndex(index)}
                    className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                      mainImage === img
                        ? "border-(--color-tiger) scale-105"
                        : "border-gray-300 hover:border-(--color-tiger)"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[--color-dark]">
              {product?.name}
            </h2>

            {/* السعر */}
            <div className="flex items-baseline gap-4">
              <p className="text-2xl font-bold text-(--color-pakistan)">
                EGP {product?.price.toFixed(2)}
              </p>
              {product?.promotionalPrice !== 0 && (
                <p className="text-lg line-through text-gray-500">
                  EGP {product?.promotionalPrice.toFixed(2)}
                </p>
              )}

              <span className="text-(--color-cornsilk) bg-(--color-tiger) px-2 py-0.5 rounded-full ">
                {product?.discountPercentage.toFixed(0)}% OFF
              </span>
            </div>

            {/* وصف بسيط */}
            <p className="text-(--color-pakistan) leading-relaxed">
              {product?.description}
            </p>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[--color-dark]">
                Select Size:
              </h4>
              <div className="flex gap-3 flex-wrap">
                {Array.isArray(product?.sizes) &&
                  product?.sizes?.map(
                    (size: ProductSizeType, index: number) => {
                      if (!size.size) return null;
                      const isOutOfStock = size.stock === 0;
                      return (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedSize(size?.id!)}
                          whileTap={!isOutOfStock ? { scale: 0.9 } : {}}
                          disabled={isOutOfStock}
                          className={`px-4 py-2 rounded-full test-lg font-medium border-2 transition-all  ${
                            isOutOfStock
                              ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed opacity-60"
                              : selectedSize === size?.id
                              ? "bg-(--color-tiger) text-white border-(--color-tiger) cursor-pointer"
                              : "border-gray-400 text-gray-700 hover:border-(--color-tiger) cursor-pointer"
                          }`}
                          title={
                            isOutOfStock
                              ? "Out of stock"
                              : `Select size ${size.size}`
                          }
                        >
                          {size.size}
                        </motion.button>
                      );
                    }
                  )}
              </div>
              {selectedSize && (
                <div className="mt-3 p-2 bg-(--color-earth)/10 rounded-xl border border-(--color-earth)/30 w-fit">
                  <p className="text-sm text-(--color-pakistan)">
                    {(() => {
                      const selected = product?.sizes?.find(
                        (size) => size.id === selectedSize
                      );
                      if (!selected) return null;

                      return (
                        <>
                          <span className="font-semibold text-(--color-tiger)">
                            Size: {selected.size}
                          </span>

                          <span className="ml-2 text-(--color-dark)">
                            (
                            <span className="font-medium text-(--color-pakistan)">
                              Length:
                            </span>{" "}
                            {selected.length} cm —{" "}
                            <span className="font-medium text-(--color-pakistan)">
                              Width:
                            </span>{" "}
                            {selected.width} cm )
                          </span>
                        </>
                      );
                    })()}
                  </p>
                </div>
              )}
              {errors.selectedSize && (
                <p className="text-red-500 text-sm">{errors.selectedSize}</p>
              )}
            </div>

            <div className="mt-4">
              <span className="text-lg font-semibold text-(--color-dark)">
                Quantity:
              </span>
              <div className="flex items-center gap-4 mt-4 bg-(--color-earth)/10 rounded-full border border-(--color-earth)/30 w-fit p-0.5">
                <button
                  onClick={decrease}
                  className="w-10 h-10 flex items-center justify-center bg-(--color-tiger) text-(--color-cornsilk) rounded-full text-xl font-bold shadow hover:bg-(--color-tiger)/80 transition cursor-pointer"
                >
                  −
                </button>

                <span className="text-xl font-semibold text-(--color-dark)">
                  {quantity}
                </span>

                <button
                  onClick={increase}
                  className="w-10 h-10 flex items-center justify-center bg-(--color-tiger) text-(--color-cornsilk) rounded-full text-xl font-bold shadow hover:bg-(--color-tiger)/80 transition cursor-pointer"
                >
                  +
                </button>
              </div>
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>

            <div className="mt-4 w-full">
              <div className="flex justify-between mb-1 text-sm font-semibold text-[--color-dark]">
                <span>Available Stock</span>
                <span>
                  {product?.stock} / {product?.total_stock}
                </span>
              </div>

              <div className="w-full h-3 bg-(--color-earth) rounded-full overflow-hidden">
                <motion.div
                  className="h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${percentstock}%`,
                    backgroundColor: getColor(),
                  }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={addToCart}
                className={`flex-1 py-3 rounded-full font-semibold text-white shadow-md text-lg transition-all bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer`}
                style={{
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                Add to Cart
              </button>

              {/* زر القلب جنب الزر */}
              <motion.button
                onClick={handleToggleWishlist}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full shadow-md border cursor-pointer"
              >
                <Heart
                  size={26}
                  color={isFav ? "#BC6C25" : "black"}
                  fill={isFav ? "#BC6C25" : "transparent"}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </>
  );
}
