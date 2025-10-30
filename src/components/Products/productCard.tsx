import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductCard() {
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("M");

  const colors = ["red", "blue", "green", "black"];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-12 max-w-7xl mx-auto">
      {/* صورة المنتج */}
      <motion.div
        className="md:w-1/2 rounded-3xl overflow-hidden shadow-2xl bg-white"
        whileHover={{ scale: 1.03 }}
      >
        <img
          src="/product-front.jpg"
          alt="Front View"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* تفاصيل المنتج */}
      <div className="md:w-1/2 flex flex-col justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            اسم المنتج
          </h1>
          <p className="text-xl text-gray-600 mb-2">الوصف القصير للمنتج هنا.</p>
          <p className="text-2xl font-bold mb-4">$120</p>

          {/* اختيار اللون */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-medium">Color:</span>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-black"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* اختيار المقاس */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Size:</span>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg font-medium ${
                  selectedSize === size
                    ? "bg-(--color-primary) text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* أزرار الإضافة للسلة والشراء */}
        <div className="flex flex-col md:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex-1 py-3 bg-(--color-primary) text-white font-bold rounded-full shadow-md hover:bg-black transition-all"
          >
            أضف للسلة
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex-1 py-3 border-2 border-(--color-primary) text-(--color-primary) font-bold rounded-full shadow-md hover:bg-(--color-primary) hover:text-white transition-all"
          >
            اشتري الآن
          </motion.button>
        </div>
      </div>
    </div>
  );
}
