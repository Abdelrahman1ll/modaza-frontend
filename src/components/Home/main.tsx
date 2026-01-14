import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { getCloudinaryUrl, getCloudinarySrcSet } from "../../utils/cloudinary";

const MODEL1_ID = "v1768316779/premium_photo-1681494700976-861938fe0513_gz2j30";
const MODEL2_ID = "v1768316743/premium_photo-1673826949034-18367fc03955_xcpma8";
const MODEL4_ID = "v1768316551/premium_photo-1667520043080-53dcca77e2aa_iehpcz";

import { Link } from "react-router-dom";

type Section = {
  id: number;
  images: string[];
  height: string;
  layout: string;
  animation: Variants;
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" }, // Smoother reveal
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }, // Premium ease
  },
};
const sections: Section[] = [
  {
    id: 1,
    images: [MODEL1_ID, MODEL4_ID],
    animation: {
      hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1, ease: "easeOut" },
      },
    },
    layout: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8", // Slightly larger gap
    height: "min-h-[80vh]",
  },
];
/**
 * Main (Hero) Section: The landing view of the home page.
 * القسم الرئيسي: واجهة العرض الأولى في الصفحة الرئيسية.
 */
export default function Main() {
  return (
    <>
      <main className="bg-transparent text-center overflow-hidden relative">
        {/* Decorative background elements for premium feel */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-(--color-tiger)/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] bg-(--color-pakistan)/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="m-4 md:m-6 md:mt-10">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            className="relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full h-[65vh] md:h-[80vh] lg:h-[88vh] group"
          >
            {/* Image with subtle hover parallax-like ease */}
            <motion.img
              whileHover={{
                scale: 1.05,
                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              }}
              src={getCloudinaryUrl(MODEL2_ID, { width: 1400 })}
              srcSet={getCloudinarySrcSet(MODEL2_ID)}
              alt="Model showcasing trendy fashion outfit in hero section"
              width={1400}
              height={1000}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover origin-center"
            />

            {/* Premium Gradient Overlay with layered opacity */}
            <div className="absolute inset-0 bg-linear-to-tr from-black/70 via-black/20 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/30" />

            {/* Text & Button Container */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="
                absolute
                bottom-12
                left-8
                sm:left-12
                md:left-24
                max-w-md
                sm:max-w-xl
                text-white
                text-left
                z-10
              "
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-(--color-cornsilk)">
                Discover Your
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-[#d47d2b] drop-shadow-sm">
                  Unique Style
                </span>
              </h1>

              <p className="mt-5 sm:mt-6 text-base sm:text-xl text-(--color-cornsilk)/80 font-medium max-w-[400px] leading-relaxed">
                Explore our latest fashion pieces crafted for comfort, elegance,
                and your daily expression.
              </p>

              <Link to="/products" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    mt-8 sm:mt-10
                    px-10 sm:px-12
                    py-4 sm:py-5
                    rounded-full
                    text-base sm:text-lg
                    text-white
                    font-black
                    uppercase
                    tracking-widest
                    shadow-[0_15px_30px_rgba(188,108,37,0.4)]
                    bg-(--color-tiger)
                    hover:bg-[#d47d2b]
                    transition-all
                    flex items-center gap-3
                    relative
                    overflow-hidden
                    group
                  "
                >
                  <span className="relative z-10">Shop Collection</span>
                  <motion.svg
                    className="w-6 h-6 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {sections.map((section) => (
            <motion.section
              key={section.id}
              className={`flex flex-col justify-center items-center ${section.height} ${section.layout} m-4 md:m-6`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {section.images.map((img, i) => (
                <motion.div
                  key={i}
                  variants={section.animation}
                  whileHover={{
                    scale: 1.02,
                    translateY: -8,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                  className="relative overflow-hidden rounded-4xl w-full h-[65vh] md:h-[80vh] lg:h-[88vh] bg-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] group"
                >
                  <motion.div
                    className="w-full h-full"
                    whileHover={{
                      scale: 1.08,
                      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                    }}
                  >
                    <img
                      src={getCloudinaryUrl(img, { width: 1400 })}
                      alt={`Featured fashion trend showcase ${i + 1}`}
                      width={1400}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      srcSet={getCloudinarySrcSet(img)}
                      sizes="(max-width: 640px) 400px, (max-width: 768px) 800px, 1400px"
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </motion.section>
          ))}
        </div>
      </main>
    </>
  );
}
