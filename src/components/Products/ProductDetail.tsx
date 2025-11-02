import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number; // ممكن تكون غير موجودة
  images: string[];
  sizes: string[];
  stock: number; // ممكن تكون undefined لو مش مذكورة
  maxStock: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Street Hoodie",
    price: 49,
    oldPrice: 69,
    images: [
      "/photo-1495385794356-15371f348c31.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
    maxStock: 100,
  },
  {
    id: 2,
    name: "Casual Jacket",
    price: 89,
    oldPrice: 129,
    images: [
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
    sizes: ["M", "L", "XL"],
    stock: 50,
    maxStock: 100,
  },
  {
    id: 3,
    name: "Denim Pants",
    price: 69,
    oldPrice: 99,
    images: [
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
      "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
    maxStock: 100,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p: { id: number }) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);

  if (!product) {
    return (
      <div className="text-center text-red-600 text-xl mt-10">
        Product not found
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const mainImage = product.images[currentIndex];
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => Math.min(prev + 1, 10)); // أقصى 10
  const decrease = () => setQuantity((prev) => Math.max(prev - 1, 1)); // أدنى 1

  const percent = Math.min((product.stock / product.maxStock) * 100, 100);

  // اللون حسب نسبة المخزون
  const getColor = () => {
    if (percent > 60) return "var(--color-pakistan)"; // أخضر
    if (percent > 30) return "var(--color-tiger)"; // برتقالي
    return "#FF0000"; // أحمر
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-10 m-4 mt-12">
      {/* ✅ الجزء الأيسر: معرض الصور */}
      <motion.div
        className="relative rounded-t-3xl overflow-hidden  w-full md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* الصورة الرئيسية */}
        <motion.img
          key={mainImage}
          src={mainImage}
          alt={product.name}
          className="w-full h-[750px] object-cover rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* أسهم التنقل */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-(--color-pakistan) bg-opacity-60 hover:bg-opacity-90 text-(--color-cornsilk) p-3 rounded-full transition cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-(--color-pakistan) bg-opacity-60 hover:bg-opacity-90 text-(--color-cornsilk) p-3 rounded-full transition cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>

        {/* الصور المصغّرة */}
        <div className="flex justify-center flex-wrap gap-3 mt-4">
          {product.images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
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
          {product.name}
        </h2>

        {/* السعر */}
        <div className="flex items-baseline gap-4">
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-pakistan)" }}
          >
            EGP {product.price}
          </p>
          <p className="text-lg line-through text-gray-500">
            EGP {product.oldPrice}
          </p>
          <span className="text-(--color-cornsilk) bg-(--color-tiger) px-2 py-1 rounded-full font-semibold">
            {discountPercent}%
          </span>
        </div>

        {/* وصف بسيط */}
        <p className="text-(--color-pakistan) leading-relaxed">
          Elevate your style with our premium {product.name}. Designed for
          comfort and crafted with high-quality materials.
        </p>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-[--color-dark]">
            Select Size:
          </h4>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size) => (
              <motion.button
                key={size}
                onClick={() => setSelectedSize(size)}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-full test-lg font-medium border-2 transition-all cursor-pointer ${
                  selectedSize === size
                    ? "bg-(--color-tiger) text-white border-(--color-tiger)"
                    : "border-gray-400 text-gray-700 hover:border-(--color-tiger)"
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
          {selectedSize && (
            <p className="text-sm text-(--color-pakistan) mt-2">
              Selected size:{" "}
              <span className="font-semibold">{selectedSize}</span>
            </p>
          )}
        </div>

        <div className="mt-4">
          <span className="text-lg font-semibold text-(--color-dark)">
            Quantity:
          </span>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={decrease}
              className="w-10 h-10 flex items-center justify-center bg-(--color-cornsilk) text-(--color-pakistan) rounded-full text-xl font-bold shadow hover:bg-(--color-tiger) hover:text-(--color-cornsilk) transition cursor-pointer"
            >
              −
            </button>

            <span className="text-xl font-semibold text-(--color-dark)">
              {quantity}
            </span>

            <button
              onClick={increase}
              className="w-10 h-10 flex items-center justify-center bg-(--color-cornsilk) text-(--color-pakistan) rounded-full text-xl font-bold shadow hover:bg-(--color-tiger) hover:text-(--color-cornsilk) transition cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-4 w-full">
          <div className="flex justify-between mb-1 text-sm font-semibold text-[--color-dark]">
            <span>Available Stock</span>
            <span>
              {product.stock} / {product.maxStock}
            </span>
          </div>

          <div className="w-full h-3 bg-[--color-cornsilk] rounded-full overflow-hidden">
            <motion.div
              className="h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%`, backgroundColor: getColor() }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button
            // onClick={addToCart}
            // disabled={!selectedSize}
            className={`flex-1 py-3 rounded-full font-semibold text-white shadow-md text-lg transition-all bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer`}
            style={{
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            Add to Cart
          </button>

          {/* زر القلب جنب الزر */}
          <motion.button
            onClick={() => setIsFav(!isFav)}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full shadow-md border"
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
  );
}
