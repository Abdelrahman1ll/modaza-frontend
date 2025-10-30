import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackButton() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY < 1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={goBack}
      className="fixed top-30 left-4.5 transform -translate-y-1/2 text-(--color-text) p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform z-40 cursor-pointer"
      title="الرجوع للصفحة السابقة"
    >
      <ArrowLeft size={20} />
    </button>
  );
}
