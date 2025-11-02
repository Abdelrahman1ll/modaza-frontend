import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const products = [
  {
    id: 1,
    name: "Casual T-Shirt",
    price: "700 EGP",
    discount: "20%",
    images: [
      "/photo-1495385794356-15371f348c31.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
  },
  {
    id: 2,
    name: "Classic Jeans",
    price: "1200 EGP",
    discount: null,
    images: [
      "/photo-1495385794356-15371f348c31.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
  },
  {
    id: 3,
    name: "Modern Sweatshirt",
    price: "900 EGP",
    discount: "15%",
    images: [
      "/photo-1495385794356-15371f348c31.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
  },
];

export default function Product() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };
  return (
    <>
      <div className="py-14">
        <h2
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
          style={{ color: "var(--color-dark)" }}
        >
          Products
        </h2>

        <section className="max-w-7xl mx-auto px-6">
          {/* شبكة المنتجات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => {
              const isFav = favorites.includes(product.id);

              return (
                <motion.div
                  key={product.id}
                  className="rounded-3xl overflow-hidden bg-transparent shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  {/* الصورة */}
                  <div className="relative">
                    <motion.img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-[400px] object-cover transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                    />

                    <motion.button
                      onClick={() => toggleFavorite(product.id)}
                      whileTap={{ scale: 0.8 }}
                      className="absolute top-4 right-4 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer"
                    >
                      <Heart
                        size={24}
                        color={isFav ? "#BC6C25" : "black"}
                        fill={isFav ? "#BC6C25" : "transparent"}
                      />
                    </motion.button>

                    {/* الخصم */}
                    {product.discount && (
                      <span className="absolute top-4 left-4 bg-(--color-tiger) text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                        {product.discount} OFF
                      </span>
                    )}
                  </div>

                  {/* التفاصيل */}
                  <div className="p-4 flex flex-col gap-4 grow">
                    {/* الاسم والسعر في صف واحد */}
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-dark)" }}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="text-lg font-bold"
                        style={{ color: "var(--color-pakistan)" }}
                      >
                        {product.price}
                      </p>
                    </div>

                    {/* الزرار */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-auto w-full py-2 px-4 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all self-center cursor-pointer"
                      onClick={() =>
                        navigate(`/products-details/${product.id}`)
                      }
                    >
                      Product Details
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
