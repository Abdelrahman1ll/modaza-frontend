import { motion } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import type { CartItemType } from "../../types/CartType";
import UseCart from "./useCart";

/**
 * Cart: Shopping cart interface for viewing, adjusting, and proceeding to checkout.
 * السلة: واجهة سلة التسوق لعرض وتعديل المنتجات والمتابعة لإتمام الطلب.
 */
export default function Cart() {
  const {
    data,
    isLoading,
    isError,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    navigate,
  } = UseCart();
  return (
    <div className="p-6 mt-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-(--color-tiger) block mb-2">
          Your Selection
        </span>
        <h2 className="text-4xl font-black tracking-tight text-(--color-pakistan)">
          Shopping Cart
        </h2>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-6">
          {[1, 2].map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl shadow-md animate-pulse"
              style={{ backgroundColor: "var(--color-cornsilk)" }}
            >
              <div className="w-44 h-44 bg-(--color-earth)/30 rounded-xl" />
              <div className="flex-1 flex flex-col gap-2 w-full">
                <div className="flex justify-between items-start">
                  <div className="h-6 bg-(--color-earth)/30 rounded w-1/3"></div>
                  <div className="w-8 h-8 rounded-full bg-(--color-earth)/30"></div>
                </div>
                <div className="h-6 bg-(--color-earth)/30 rounded w-1/4 mt-2"></div>

                <div className="mt-1 w-full">
                  <div className="flex justify-between mb-1">
                    <div className="h-3 bg-(--color-earth)/30 rounded w-1/4"></div>
                    <div className="h-3 bg-(--color-earth)/30 rounded w-1/6"></div>
                  </div>
                  <div className="w-full h-3 bg-(--color-earth)/20 rounded-full" />
                </div>

                <div className="flex flex-row max-[470px]:flex-col max-[470px]:gap-4 justify-between mt-3">
                  <div className="p-2 bg-(--color-earth)/20 rounded-xl border w-fit max-[470px]:w-full h-10" />
                  <div className="flex items-end p-0.5 gap-2 bg-(--color-earth)/20 rounded-2xl border max-[470px]:w-full max-[470px]:justify-between h-10" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* زر الدفع */}
          <div className="mt-4 mb-4 w-full py-3 rounded-2xl shadow-md bg-(--color-earth)/20 animate-pulse h-12"></div>
        </div>
      ) : isError || !data?.carts?.items?.length ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-12 text-center"
        >
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-tiger)/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-(--color-pakistan)/5 rounded-full blur-2xl -z-10" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="w-24 h-24 bg-linear-to-br from-(--color-tiger) to-(--color-earth) rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl shadow-(--color-tiger)/20 mb-8"
          >
            <ShoppingBag size={40} strokeWidth={2.5} />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-black text-(--color-pakistan) mb-4 tracking-tight"
          >
            {isError ? "Something went wrong" : "Your cart is empty"}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-(--color-pakistan)/60 font-medium max-w-sm mx-auto mb-10 leading-relaxed text-sm"
          >
            {isError
              ? "We couldn't load your cart right now. Please try again or head back to our collections."
              : "Looks like you haven’t added any items to your cart yet. Explore our latest arrivals to find something you love!"}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/products")}
            className="group relative inline-flex items-center gap-3 px-10 py-4 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all"
            style={{
              background:
                "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
            }}
          >
            <span className="relative z-10">Start Shopping</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-6">
          {data?.carts?.items.map((item: CartItemType) => {
            const percentstock = Math.min(
              (item?.product?.stock / item?.product?.total_stock) * 100,
              100,
            );

            const getColor = () => {
              if (percentstock > 60) return "var(--color-tiger)";
              if (percentstock > 30) return "var(--color-dark)";
              return "#A80000";
            };

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4 rounded-4xl bg-(--color-cornsilk) backdrop-blur-sm shadow-xl border border-white/30"
              >
                <img
                  src={item?.product?.images[0]}
                  alt={item?.product?.name}
                  loading="lazy"
                  decoding="async"
                  className="w-44 h-44 object-cover rounded-xl md:self-center"
                  srcSet={`
                    ${item?.product?.images[0]}?w=200 200w,
                   ${item?.product?.images[0]}?w=400 400w,
                   ${item?.product?.images[0]}?w=800 800w
                 `}
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 400px, 800px"
                />

                <div className="flex-1 flex flex-col gap-2 w-full">
                  {/* اسم المنتج + حذف */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-(--color-pakistan) tracking-tight">
                      {item?.product?.name}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove item"
                      onClick={() => removeItem(item?.id)}
                      className="p-2 rounded-full transition cursor-pointer text-white bg-(--color-tiger) shadow-lg"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </motion.button>
                  </div>

                  {/* السعر */}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-(--color-tiger)">
                      {item?.product?.price}
                    </span>
                    <span className="text-xs font-bold uppercase opacity-60 tracking-wider">
                      EGP
                    </span>
                  </div>

                  {/* شريط الكمية */}
                  <div className="mt-3 w-full">
                    <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-wider text-(--color-dark)/70">
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

                  <div className="flex flex-row max-[520px]:flex-col max-[520px]:gap-4 justify-between mt-4">
                    {/* المقاس */}
                    <div className="p-3 bg-(--color-earth)/10 rounded-2xl border border-(--color-earth)/20 w-fit max-[520px]:w-full">
                      <p className="text-lg text-center text-(--color-pakistan)">
                        <span className="font-black text-(--color-tiger) uppercase text-lg tracking-wider">
                          Size: {item?.sizes?.size}
                        </span>
                        <span className="ml-2 text-(--color-dark) text-lg">
                          (
                          <span className="font-semibold text-(--color-pakistan)">
                            L:
                          </span>{" "}
                          {item?.sizes.length}cm —{" "}
                          <span className="font-semibold text-(--color-pakistan)">
                            W:
                          </span>{" "}
                          {item?.sizes.width}cm)
                        </span>
                      </p>
                    </div>

                    {/* الكمية */}
                    <div className="flex items-center p-1 gap-3 bg-white border-2 border-gray-100 rounded-full shadow-sm max-[520px]:w-full max-[520px]:justify-between">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        disabled={item?.quantity <= 1}
                        onClick={() =>
                          decreaseQuantity({
                            id: item?.id,
                            quantity: item?.quantity,
                          })
                        }
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-(--color-pakistan) rounded-full text-xl font-black hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        −
                      </motion.button>
                      <span className="text-xl font-black text-(--color-pakistan) min-w-8 text-center">
                        {item?.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        disabled={item?.quantity >= item?.product?.stock}
                        onClick={() =>
                          increaseQuantity({
                            id: item?.id,
                            quantity: item?.quantity,
                          })
                        }
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-(--color-pakistan) rounded-full text-xl font-black hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* زر الدفع */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/checkout")}
            className="mt-8 mb-4 w-full py-4 text-white text-xl bg-linear-to-r from-(--color-tiger) to-(--color-earth) cursor-pointer font-black rounded-2xl shadow-2xl transition-all tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
            }}
          >
            Checkout
          </motion.button>
        </div>
      )}
    </div>
  );
}
