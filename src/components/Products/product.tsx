import { motion } from "framer-motion";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Casual T-Shirt",
    price: 700,
    discount: "20%",
    images: [
      "/photo-1495385794356-15371f348c31.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Classic Jeans",
    price: 1200,
    discount: "10%",
    images: [
      "/photo-1495385794356-15371f348c31.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
    sizes: ["30", "32", "34", "36"],
  },
  {
    id: 3,
    name: "Modern Sweatshirt",
    price: 900,
    discount: "15%",
    images: [
      "/photo-1495385794356-15371f348c31.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
    sizes: ["S", "M", "L"],
  },
];

export default function Product() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentImage, setCurrentImage] = useState<{ [key: number]: number }>(
    {}
  );

  const user: string = "admin";

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const nextImage = (id: number, total: number) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total,
    }));
  };

  const prevImage = (id: number, total: number) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) === 0 ? total - 1 : (prev[id] || 0) - 1,
    }));
  };

  return (
    <div className="py-14 m-4">
      <section className="max-w-7xl mx-auto">
        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => {
            const isFav = favorites.includes(product.id);
            const imgIndex = currentImage[product.id] || 0;
            const discountValue = product.discount
              ? parseFloat(product.discount)
              : 0;
            const discountedPrice = product.discount
              ? (product.price * (1 - discountValue / 100)).toFixed(0)
              : product.price;

            return (
              <motion.div
                key={product.id}
                className="bg-transparent transition-all duration-300 flex flex-col"
                whileHover={{ y: -5 }}
              >
                {/* الصورة */}
                <div className="relative rounded-3xl overflow-hidden group">
                  {/* سلايدر الصور */}
                  <motion.img
                    key={imgIndex}
                    src={product.images[imgIndex]}
                    alt={product.name}
                    className="w-full h-[460px] rounded-3xl object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />

                  {/* أزرار السلايدر */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          prevImage(product.id, product.images.length)
                        }
                        className="absolute left-3 text-(--color-tiger) top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft
                          size={20}
                          className="text-(-color-tiger)"
                        />
                      </button>
                      <button
                        onClick={() =>
                          nextImage(product.id, product.images.length)
                        }
                        className="absolute right-3 text-(--color-tiger) top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* زرار القلب */}
                  <motion.button
                    onClick={() => toggleFavorite(product.id)}
                    whileTap={{ scale: 0.8 }}
                    className="absolute top-4 right-4 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <motion.div
                      initial={false}
                      animate={{ scale: isFav ? 1.3 : 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Heart
                        size={24}
                        color={isFav ? "#BC6C25" : "black"}
                        fill={isFav ? "#BC6C25" : "transparent"}
                      />
                    </motion.div>
                  </motion.button>

                  {/* الخصم */}
                  {product.discount && (
                    <span className="absolute top-4 left-4 bg-(--color-tiger) text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {product.discount} OFF
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
                      {product.name}
                    </h3>

                    <div className="flex flex-col items-end">
                      {product.discount && (
                        <span className="text-gray-400 line-through text-sm">
                          {product.price} EGP
                        </span>
                      )}
                      <span
                        className="text-lg font-bold"
                        style={{ color: "var(--color-pakistan)" }}
                      >
                        {discountedPrice} EGP
                      </span>
                    </div>
                  </div>

                  {/* الأزرار */}
                  <div className="flex gap-4 w-full">
                    {/* زر عرض التفاصيل */}
                    <Link
                      to={`/products-details/${product.id}`}
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
                    {user !== "user" && (
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
          })}
        </div>
      </section>
    </div>
  );
}
