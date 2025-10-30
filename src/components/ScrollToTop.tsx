import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 text-(--color-text) p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform z-90 cursor-pointer"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}
