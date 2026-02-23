import {
  ChevronLeft,
  ChevronRight,
  Heart,
  PackageSearch,
  X,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductSizeType } from "../../types/ProductType";
import MotionZoomImage from "./ImageZoom";
import useProductDetail from "./useProductDetail";
import AddToCartButton from "./AddToCartButton";
/**
 * ProductDetail: Renders the full details of a specific product, including images, sizes, and stock.
 * تفاصيل المنتج: يعرض التفاصيل الكاملة لمنتج معين، بما في ذلك الصور، المقاسات، وحالة المخزون.
 */
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
    isLoading,
    isFetching,
    setCurrentIndex,
  } = useProductDetail();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageClick = () => {
    if (window.innerWidth >= 768) {
      setIsFullscreen(true);
    }
  };
  return (
    <>
      {isLoading || isFetching ? (
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
      ) : !product ? (
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
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-10 m-4 mt-12">
          <motion.div
            className="relative rounded-[2.5rem] overflow-hidden w-full md:w-1/2 bg-white/50 backdrop-blur-sm shadow-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* الصورة الرئيسية ككونتينر بريميوم */}
            <div className="relative overflow-hidden rounded-4xl m-2">
              <MotionZoomImage
                mainImage={mainImage}
                onImageClick={handleImageClick}
              />

              {/* أسهم التنقل - Glassmorphism */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-10">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="pointer-events-auto bg-white/60 backdrop-blur-md text-(--color-tiger) p-3 rounded-full shadow-lg transition-all border border-white/40 cursor-pointer"
                >
                  <ChevronLeft size={24} strokeWidth={2.5} />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="pointer-events-auto bg-white/60 backdrop-blur-md text-(--color-tiger) p-3 rounded-full shadow-lg transition-all border border-white/40 cursor-pointer"
                >
                  <ChevronRight size={24} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>

            {/* الصور المصغّرة - الشريط السفلي */}
            <div className="flex justify-center flex-wrap gap-4 p-4">
              {Array.isArray(product?.images) &&
                product?.images?.map((img: string, index: number) => (
                  <motion.div
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      mainImage === img
                        ? "border-(--color-tiger) shadow-lg scale-110 z-10"
                        : "border-transparent hover:border-white/60 grayscale-[0.5] hover:grayscale-0"
                    }`}
                  >
                    <img
                      src={img || "/photo-1495385794356-15371f348c31.jpeg"}
                      alt={`${product?.name} perspective ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {mainImage === img && (
                      <div className="absolute inset-0 bg-(--color-tiger)/10 mix-blend-overlay" />
                    )}
                  </motion.div>
                ))}
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BC6C25]/80">
                {typeof product.category === "object" &&
                product.category !== null
                  ? (product.category as unknown as { name: string }).name
                  : product.category || "Modaza Collection"}
              </span>
              <h2 className="text-4xl font-black tracking-tight text-(--color-pakistan) leading-[1.1]">
                {product?.name}
              </h2>
            </div>

            {/* السعر بريميوم */}
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-(--color-tiger)">
                  {product?.price.toLocaleString()}
                </span>
                <span className="text-xs font-bold uppercase opacity-60 tracking-wider">
                  EGP
                </span>
              </div>

              {product?.promotionalPrice !== 0 && (
                <div className="flex items-center gap-3 bg-red-50/50 px-3 py-1.5 rounded-2xl border border-red-100/50">
                  <p className="text-lg font-bold text-gray-400 line-through decoration-red-500/30 decoration-2">
                    EGP {product?.promotionalPrice.toLocaleString()}
                  </p>
                  <span className="text-xs font-black uppercase tracking-wider text-red-600 bg-white px-2.5 py-1 rounded-lg shadow-sm border border-red-100">
                    {product?.discountPercentage.toFixed(0)}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* وصف بسيط */}
            <p className="text-(--color-pakistan) leading-relaxed">
              {product?.description}
            </p>

            <div>
              <h4 className="text-lg font-semibold mb-2 md:mb-4 text-[--color-dark]">
                Select Size:
              </h4>
              <div className="flex gap-4 flex-wrap">
                {Array.isArray(product?.sizes) &&
                  product?.sizes?.map(
                    (size: ProductSizeType, index: number) => {
                      if (!size.size) return null;
                      const isOutOfStock =
                        size.stock === 0 || product.stock === 0;
                      const isSelected = selectedSize === size.id;
                      return (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedSize(size.id ?? null)}
                          whileHover={
                            !isOutOfStock ? { scale: 1.05, y: -2 } : {}
                          }
                          whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
                          disabled={isOutOfStock}
                          className={`relative h-12 w-12 flex items-center justify-center rounded-2xl text-lg font-black transition-all duration-300 ${
                            isOutOfStock
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed border-dashed border-2 border-gray-200"
                              : isSelected
                                ? "bg-(--color-tiger) text-white shadow-xl shadow-(--color-tiger)/20 border-2 border-(--color-tiger)"
                                : "bg-white text-gray-700 border-2 border-gray-100 hover:border-(--color-tiger)/30 shadow-sm"
                          }`}
                        >
                          {size.size}
                          {isOutOfStock && (
                            <div className="absolute inset-x-0 top-1/2 h-[2px] bg-gray-300 -rotate-45" />
                          )}
                        </motion.button>
                      );
                    },
                  )}
              </div>
              {selectedSize && (
                <div className="mt-3 p-2 bg-(--color-earth)/10 rounded-xl border border-(--color-earth)/30 w-fit">
                  <p className="text-sm text-(--color-pakistan)">
                    {(() => {
                      const selected = product?.sizes?.find(
                        (size) => size.id === selectedSize,
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

            <div className="">
              <span className="text-lg font-semibold text-(--color-dark)">
                Quantity:
              </span>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center p-1 bg-white border-2 border-gray-100 rounded-full shadow-sm">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={decrease}
                    className="w-10 h-10 flex items-center justify-center bg-gray-50 text-(--color-pakistan) rounded-full text-xl font-black hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    −
                  </motion.button>

                  <span className="w-12 text-center text-xl font-black text-(--color-pakistan)">
                    {quantity}
                  </span>

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={increase}
                    className="w-10 h-10 flex items-center justify-center bg-gray-50 text-(--color-pakistan) rounded-full text-xl font-black hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    +
                  </motion.button>
                </div>
              </div>
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>

            <div className="w-full">
              <div className="flex justify-between mb-1 text-sm font-semibold text-[--color-dark]">
                <span>Available Stock</span>
              </div>

              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                <motion.div
                  className="h-full rounded-full shadow-[0_0_10px_rgba(188,108,37,0.3)]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${percentstock}%`,
                    backgroundColor: getColor(),
                  }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-8">
              <AddToCartButton addToCart={addToCart} />

              {/* زر القلب جنب الزر */}
              <motion.button
                onClick={handleToggleWishlist}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-[1.25rem] shadow-xl border border-white bg-white/50 backdrop-blur-md cursor-pointer transition-all duration-300"
              >
                <Heart
                  size={26}
                  className={`transition-all duration-500 ${
                    isFav
                      ? "fill-[#BC6C25] stroke-[#BC6C25] drop-shadow-[0_0_8px_rgba(188,108,37,0.4)]"
                      : "fill-transparent stroke-gray-900"
                  }`}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-white/95 backdrop-blur-2xl p-4 md:p-10 cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-(--color-tiger) rounded-full backdrop-blur-md transition-all border border-white/20 z-110"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
            >
              <X size={32} />
            </motion.button>

            <motion.div
              layoutId="product-image"
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={mainImage}
                alt={product?.name}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl selectable-none"
                draggable={false}
              />

              {/* Navigation arrows in fullscreen */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 md:px-10 pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-(--color-tiger) p-4 rounded-full shadow-lg border border-white/20"
                >
                  <ChevronLeft size={36} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-(--color-tiger) p-4 rounded-full shadow-lg border border-white/20"
                >
                  <ChevronRight size={36} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
