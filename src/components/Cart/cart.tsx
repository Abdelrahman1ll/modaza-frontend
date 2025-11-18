import { motion } from "framer-motion";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import {
  useGetCartQuery,
  usePatchCartMutation,
  useDeleteCartMutation,
} from "../../redux/Cart/apiCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { CartItemType } from "../../types/CartType";

export default function Cart() {
  const navigate = useNavigate();
  const { data, isLoading, refetch, isError } = useGetCartQuery({});
  const [deleteCart] = useDeleteCartMutation();
  const [patchCart] = usePatchCartMutation();
  const decreaseQuantity = async ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    if (quantity <= 1) {
      toast.info("Minimum quantity reached");
      return;
    }

    try {
      await patchCart({
        id: String(id),
        data: { quantity: quantity - 1 },
      });
      refetch();
    } catch {
      toast.error("Error decreasing quantity");
    }
  };

  const increaseQuantity = async ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    if (quantity >= 15) {
      toast.info("Maximum quantity reached");
      return;
    }

    try {
      await patchCart({
        id: String(id),
        data: { quantity: quantity + 1 },
      });
      refetch();
    } catch {
      toast.error("Error increasing quantity");
    }
  };

  const removeItem = async (id: number) => {
    try {
      await deleteCart(String(id));
      refetch();
    } catch {
      toast.error("Error removing item");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2
        className="text-3xl font-bold flex items-center justify-center mb-6"
        style={{ color: "var(--color-dark)" }}
      >
        Shopping Cart
      </h2>

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
      ) : data?.carts?.items.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center h-64 rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCart size={60} className="text-(--color-tiger) mb-4" />
          <p className="text-xl sm:text-2xl font-bold text-(--color-dark) mb-2">
            Your cart is empty
          </p>
          <p className="text-center text-sm sm:text-base text-(--color-dark)/70 mb-4">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 rounded-full bg-(--color-tiger) text-white font-semibold hover:bg-(--color-earth) transition"
          >
            Start Shopping
          </button>
        </motion.div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center h-64 rounded-2xl shadow-md p-6">
          <p className="text-2xl text-red-600 font-bold mb-2">
            Error Loading Cart
          </p>
          <p className="text-sm text-red-500 text-center mb-4">
            Something went wrong. Please try again.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-full font-semibold text-white shadow-md transition"
            style={{
              backgroundColor: "var(--color-tiger)",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-earth)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-tiger)")
            }
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {data?.carts?.items.map((item: CartItemType) => {
            const percentstock = Math.min(
              (item?.product?.stock / item?.product?.total_stock) * 100,
              100
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
                className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl shadow-md"
                style={{ backgroundColor: "var(--color-cornsilk)" }}
              >
                <img
                  src={item?.product?.images[0]}
                  alt={item?.product?.name}
                  className="w-44 h-44 object-cover rounded-xl"
                />

                <div className="flex-1 flex flex-col gap-2 w-full">
                  {/* اسم المنتج + حذف */}
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: "var(--color-dark)" }}
                    >
                      {item?.product?.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item?.id)}
                      className="p-1 rounded-full transition cursor-pointer text-(--color-cornsilk) bg-(--color-tiger)"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* السعر */}
                  <p
                    className="text-lg font-bold mt-2"
                    style={{ color: "var(--color-pakistan)" }}
                  >
                    {item?.product?.price}.00 EGP
                  </p>

                  {/* شريط الكمية */}
                  <div className="mt-1 w-full">
                    <div className="flex justify-between mb-1 text-sm font-semibold text-[--color-dark]">
                      <span>Available Stock</span>
                      <span>
                        {item?.product?.stock}/{item?.product?.total_stock}
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

                  <div className="flex flex-row max-[470px]:flex-col max-[470px]:gap-4 justify-between mt-3">
                    {/* المقاس */}
                    <div className="p-2 bg-(--color-earth)/10 rounded-xl border border-(--color-earth)/30 w-fit max-[470px]:w-full">
                      <p className="text-sm text-(--color-pakistan)">
                        <span className="font-semibold text-(--color-tiger)">
                          Size: {item?.sizes?.size}
                        </span>
                        <span className="ml-2 text-(--color-dark)">
                          (
                          <span className="font-medium text-(--color-pakistan)">
                            Length:
                          </span>{" "}
                          {item?.sizes.length} cm —{" "}
                          <span className="font-medium text-(--color-pakistan)">
                            Width:
                          </span>{" "}
                          {item?.sizes.width} cm)
                        </span>
                      </p>
                    </div>

                    {/* الكمية */}
                    <div className="flex items-end p-0.5 gap-2 bg-(--color-earth)/10 rounded-full border border-(--color-earth)/30 max-[470px]:w-full max-[470px]:justify-between">
                      <button
                        onClick={() =>
                          decreaseQuantity({
                            id: item?.id,
                            quantity: item?.quantity,
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center text-white rounded-full transition"
                        style={{ backgroundColor: "var(--color-tiger)" }}
                      >
                        <Minus size={18} />
                      </button>
                      <span
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-dark)" }}
                      >
                        {item?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increaseQuantity({
                            id: item?.id,
                            quantity: item?.quantity,
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center text-white rounded-full transition"
                        style={{ backgroundColor: "var(--color-tiger)" }}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* زر الدفع */}
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 mb-4 w-full py-3 text-white text-xl bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer font-semibold rounded-2xl shadow-md transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
