import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MotionZoomImage({
  mainImage,
  product,
}: {
  mainImage: string;
  product?: { name?: string };
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [backgroundPos, setBackgroundPos] = useState("50% 50%");
  const [isHovering, setIsHovering] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.5); // مستوى الزووم الابتدائي
  const MAX_ZOOM = 6; // أقصى زووم
  const MIN_ZOOM = 1; // أقل زووم

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setBackgroundPos(`${xPercent}% ${yPercent}%`);
  };

  const handleClick = () => {
    setZoomLevel((prev) => (prev >= MAX_ZOOM ? MIN_ZOOM : prev + 1));
  };

  return (
    <motion.div
      ref={imgRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <motion.img
        key={mainImage}
        src={mainImage}
        alt={product?.name || "Product"}
        loading="lazy"
        decoding="async"
        fetchPriority="high"
        className="w-full h-[700px] max-[500px]:h-[500px] md:h-[800px] object-cover rounded-2xl select-none cursor-zoom-in"
        draggable={false}
      />

      {/* المربع المكبّر */}
      {isHovering && (
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-2xl border border-gray-300 shadow-2xl bg-no-repeat bg-cover pointer-events-none z-50"
          style={{
            left: `calc(${backgroundPos.split(" ")[0]} - 100px)`,
            top: `calc(${backgroundPos.split(" ")[1]} - 100px)`,
            backgroundImage: `url(${mainImage})`,
            backgroundPosition: backgroundPos,
            backgroundSize: `${zoomLevel * 100}%`,
          }}
        />
      )}
    </motion.div>
  );
}
