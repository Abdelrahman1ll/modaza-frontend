import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Classic Hoodie",
    price: 59,
    image: "/photo-1495385794356-15371f348c31.jpeg",
  },
  {
    id: 2,
    name: "Street Jacket",
    price: 79,
    image: "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
  },
  {
    id: 3,
    name: "Urban Tee",
    price: 35,
    image: "/premium_photo-1673826949034-18367fc03955.jpeg",
  },
  {
    id: 4,
    name: "Casual Pants",
    price: 69,
    image: "/photo-1495385794356-15371f348c31.jpeg",
  },
  {
    id: 5,
    name: "Casual Pants",
    price: 69,
    image: "/photo-1495385794356-15371f348c31.jpeg",
  },
  {
    id: 6,
    name: "Casual Pants",
    price: 69,
    image: "/photo-1495385794356-15371f348c31.jpeg",
  },
  {
    id: 7,
    name: "Casual Pants",
    price: 69,
    image: "/photo-1495385794356-15371f348c31.jpeg",
  },
  {
    id: 8,
    name: "Casual Pants",
    price: 69,
    image: "/photo-1495385794356-15371f348c31.jpeg",
  },
];

export default function ProductSlider() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div
      className="relative w-full h-full mt-4 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-cornsilk)" }}
    >
      {/* أزرار السحب */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-(--color-tiger) text-white p-2 rounded-full shadow-lg hover:bg-(--color-earth) transition z-50"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={next}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-(--color-tiger) text-white p-2 rounded-full shadow-lg hover:bg-(--color-earth) transition z-50"
      >
        <ChevronRight size={28} />
      </button>

      {/* سلايدر المنتجات */}
      <div className="w-full max-w-5xl overflow-hidden">
        <motion.div
          className="flex transition-transform duration-700 ease-in-out"
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={(_, info) => {
            if (info.offset.x < -100) next(); // سحب لليسار
            else if (info.offset.x > 100) prev(); // سحب لليمين
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-full flex flex-col items-center justify-center p-6"
            >
              <div
                className="rounded-2xl shadow-2xl overflow-hidden w-80"
                style={{ background: "var(--color-dark)" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-100 w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold text-(--color-earth)">
                  {product.name}
                </h3>
                <p className="text-(--color-tiger) font-bold">
                  EGP {product.price}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* النقاط (Indicators) */}
      <div className="flex gap-3 mt-6">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-(--color-tiger) scale-125"
                : "bg-(--color-earth) opacity-60 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
