import { motion } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface CartProduct {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
  stock: number;
  maxStock: number;
  sizes?: string[];
  selectedSize?: string;
}

const initialCart: CartProduct[] = [
  {
    id: 1,
    name: "Street Hoodie",
    price: 49,
    oldPrice: 69,
    image: "/photo-1495385794356-15371f348c31.jpeg",
    quantity: 1,
    stock: 50,
    maxStock: 100,
    sizes: ["M"],
    selectedSize: "M",
  },
  {
    id: 2,
    name: "Casual Jacket",
    price: 89,
    oldPrice: 129,
    image: "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    quantity: 2,
    stock: 20,
    maxStock: 50,
    sizes: ["L"],
    selectedSize: "L",
  },
];

export default function Cart() {
  const [cart, setCart] = useState<CartProduct[]>(initialCart);

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2
        className="text-3xl font-bold flex items-center justify-center mb-6"
        style={{ color: "var(--color-dark)" }}
      >
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p
          className="text-center text-xl"
          style={{ color: "var(--color-dark)" }}
        >
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item, index) => {
            const percent = Math.min((item.stock / item.maxStock) * 100, 100);

            const getColor = () => {
              if (percent > 60) return "var(--color-pakistan)";
              if (percent > 30) return "var(--color-tiger)";
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
                  src={item.image}
                  alt={item.name}
                  className="w-44 h-44 object-cover rounded-xl"
                />

                <div className="flex-1 flex flex-col gap-2 w-full">
                  {/* اسم المنتج + حذف */}
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: "var(--color-dark)" }}
                    >
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
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
                    {item.price}.00 EGP
                  </p>

                  {/* شريط الكمية */}
                  <div className="mt-2 w-full">
                    <div className="flex justify-between mb-1 text-sm font-semibold text-[--color-dark]">
                      <span>Available Stock</span>
                      <span>
                        {item.stock} / {item.maxStock}
                      </span>
                    </div>

                    <div className="w-full h-3 bg-(--color-earth) rounded-full overflow-hidden">
                      <motion.div
                        className="h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${percent}%`,
                          backgroundColor: getColor(),
                        }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>

                  {/* المقاس على الشمال - الكمية على اليمين */}
                  <div className="flex justify-between items-center mt-4">
                    {/* الكمية */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-white rounded-full transition"
                        style={{ backgroundColor: "var(--color-tiger)" }}
                      >
                        <Minus size={18} />
                      </button>
                      <span
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-dark)" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-white rounded-full transition"
                        style={{ backgroundColor: "var(--color-tiger)" }}
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {/* المقاس */}
                    {item.sizes && (
                      <div>
                        <div className="flex gap-2 flex-wrap">
                          {item.sizes.map((size) => (
                            <motion.button
                              key={size}
                              onClick={() => {
                                const newCart = [...cart];
                                newCart[index].selectedSize = size;
                                setCart(newCart);
                              }}
                              whileTap={{ scale: 0.9 }}
                              className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all cursor-pointer ${
                                item.selectedSize === size
                                  ? "bg-(--color-tiger) text-white border-(--color-tiger)"
                                  : "border-gray-400 text-gray-700 hover:border-(--color-tiger)"
                              }`}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* زر الدفع */}
          <button className="mt-4 mb-4 w-full py-3 text-white text-xl bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer font-semibold rounded-2xl shadow-md transition">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
