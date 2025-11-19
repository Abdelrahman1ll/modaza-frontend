import { useState } from "react";
import { ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "../../redux/products/apiProducts";
import type { ProductType } from "../../types/ProductType";
import { useNavigate } from "react-router-dom";

export default function ProductSlider() {
  const navigate = useNavigate();

  const { data: products, isLoading } = useGetProductsQuery('');
  const [index, setIndex] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const next = () => {
    setIndex((prev) => (prev + 1) % products?.products.length);
  };

  const prev = () => {
    setIndex(
      (prev) =>
        (prev - 1 + products?.products.length) % products?.products.length
    );
  };

  return (
    <>
      <div className="relative w-full h-full mt-2 flex flex-col items-center justify-center overflow-hidden">
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
            className={`flex transition-transform duration-700 ease-in-out ${
              isGrabbing ? "cursor-grabbing" : "cursor-grab"
            }`}
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onPointerDown={() => setIsGrabbing(true)} // ✅ يبدأ السحب
            onPointerUp={() => setIsGrabbing(false)} // ✅ يسيب الماوس أو التاتش
            onPointerLeave={() => setIsGrabbing(false)} // ✅ لو خرج المؤشر برا العنصر
            onDragEnd={(_, info) => {
              setIsGrabbing(false);
              if (info.offset.x < -100) next(); // سحب لليسار
              else if (info.offset.x > 100) prev(); // سحب لليمين
            }}
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-full flex flex-col items-center justify-center p-6"
                >
                  <div
                    className="rounded-2xl shadow-2xl overflow-hidden w-80 bg-gray-200 animate-pulse"
                    style={{ background: "var(--color-dark)" }}
                  >
                    <div className="h-[460px] w-full bg-gray-300" />
                  </div>

                  <div className="text-center mt-4 w-80">
                    <div className="h-6 w-40 bg-gray-300 rounded mx-auto mb-2"></div>
                    <div className="h-5 w-24 bg-gray-300 rounded mx-auto"></div>
                  </div>
                </div>
              ))
            ) : products?.products.length ? (
              products?.products.map((product: ProductType) => (
                <div
                  key={product?.id}
                  className="min-w-full flex flex-col items-center justify-center p-6"
                >
                  <div
                    className="rounded-2xl shadow-2xl overflow-hidden w-80"
                    style={{ background: "var(--color-dark)" }}
                    onClick={() => {
                      navigate(`/products-details/${product?.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <img
                      src={product?.images[0]}
                      alt={product?.name}
                      className="h-100 w-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-(--color-earth)">
                      {product?.name}
                    </h3>
                    <p className="text-(--color-tiger) font-bold">
                      EGP {product?.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="min-w-full flex flex-col items-center justify-center p-6">
                <div
                  className="rounded-2xl  overflow-hidden w-80 flex items-center justify-center"
                  style={{ height: "460px" }}
                >
                  <div className="flex flex-col items-center justify-center h-full w-full text-center">
                    <PackageSearch
                      size={80}
                      className="text-(--color-tiger) mb-4 animate-bounce"
                    />
                    <p className="text-gray-400 text-lg font-medium">
                      No products found
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* النقاط (Indicators) */}
        <div className="flex gap-3 mt-6 mb-1">
          {products?.products.slice(0, 10).map((_: ProductType, i: number) => (
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
    </>
  );
}
