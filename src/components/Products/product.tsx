import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="py-14 m-4">
        <h2
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
          style={{ color: "var(--color-dark)" }}
        >
          Products
        </h2>

        <section className="max-w-7xl mx-auto ">
          {/* شبكة المنتجات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => {
              const isFav = favorites.includes(product.id);

              return (
                <motion.div
                  key={product.id}
                  className=" bg-transparent transition-all duration-300 flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  {/* الصورة */}
                  <div className="relative rounded-3xl overflow-hidden group">
                    {/* الصورة */}
                    <Link to={`/products-details/${product.id}`}>
                    <motion.img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-[460px] rounded-3xl object-cover transition-transform duration-500"
                      whileHover={{ scale: 1.05 }}
                    />
                    </Link>

                    {/* زرار القلب */}
                    <motion.button
                      onClick={() => toggleFavorite(product.id)}
                      whileTap={{ scale: 0.8 }}
                      className="absolute top-4 right-4 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <Heart
                        size={24}
                        color={isFav ? "#BC6C25" : "black"}
                        fill={isFav ? "#BC6C25" : "transparent"}
                      />
                    </motion.button>

                    {/* الخصم */}
                    {product.discount && (
                      <span className="absolute top-4 left-4 bg-(--color-tiger) text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {product.discount} OFF
                      </span>
                    )}
                  </div>

                  {/* التفاصيل */}
                  <div className="p-4 flex flex-col gap-4 grow">
                    {/* الاسم والسعر في صف واحد */}
                    <div className="flex items-center justify-between mb-2">
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
                      View Product
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
