import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Casual T-Shirt",
    price: "700 EGP",
    discount: "20%",
    img: "/photo-1495385794356-15371f348c31.jpeg",
  },
  {
    id: 2,
    name: "Classic Jeans",
    price: "1200 EGP",
    discount: null,
    img: "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
  },
  {
    id: 3,
    name: "Modern Sweatshirt",
    price: "900 EGP",
    discount: "15%",
    img: "/premium_photo-1681494700976-861938fe0513.jpeg",
  },
];

export default function HomeProducts() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl py-2 font-bold mb-3 mt-24 text-center">
        Latest Products
      </h2>
      <section className="max-w-7xl mx-auto px-6 py-2 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative overflow-hidden rounded-3xl cursor-pointer group shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-[450px] object-cover rounded-3xl"
              />

              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  {product.discount} OFF
                </span>
              )}

              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/70 via-black/20 to-transparent p-4 text-white flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg font-bold">{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-2 py-2 px-4 bg-(--color-primary) text-white rounded-full font-semibold shadow-md hover:bg-black transition-all"
                >
                  Shop Now
                </motion.button>
              </div>

              <motion.div className="absolute inset-0 bg-black/25 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
