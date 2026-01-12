import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import "./AddToCartButton.css"; // هنضيف الكي فريمز هنا

/**
 * AddToCartButton: A reusable button component with loading state for cart operations.
 * زر الإضافة للسلة: مكون زر قابل لإعادة الاستخدام مع حالة تحميل لعمليات السلة.
 */
export default function AddToCartButton({
  addToCart,
}: {
  addToCart: () => void;
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    addToCart();
    setTimeout(() => setClicked(false), 1000); // مدة أطول لرؤية الحركة بالكامل
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 flex-1 py-3 rounded-full font-semibold text-white text-lg relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-earth)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Overlay متحرك */}
      <span
        className={`absolute top-0 left-0 h-full w-full rounded-full ${
          clicked ? "slideOverlay" : ""
        }`}
        style={{
          backgroundColor: "var(--color-tiger)",
        }}
      ></span>

      <span className="relative z-10">Add to Cart</span>
      <ShoppingCart
        size={26}
        className={`relative z-10 transition-transform duration-300 ${
          clicked ? "translate-x-2 rotate-12" : ""
        }`}
      />
    </button>
  );
}
