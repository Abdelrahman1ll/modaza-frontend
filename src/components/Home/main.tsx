import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import model1 from "/photo-1495385794356-15371f348c31.jpeg";
import model2 from "/premium_photo-1667520043080-53dcca77e2aa.jpeg";
import model3 from "/premium_photo-1673826949034-18367fc03955.jpeg";
import model4 from "/premium_photo-1681494700976-861938fe0513.jpeg";
import { Link } from "react-router-dom";

type Section = {
  id: number;
  images: string[];
  height: string;
  layout: string;
  animation: Variants;
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: -150, rotate: -5 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};
const sections: Section[] = [
  {
    id: 2,
    images: [model3, model4],
    animation: {
      hidden: { opacity: 0, y: 150, scale: 0.9 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 60, damping: 10 },
      },
    },
    layout: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
    height: "min-h-[80vh]",
  },
  {
    id: 1,
    images: [model1, model2],
    animation: {
      hidden: { opacity: 0, x: -200 },
      show: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 70 },
      },
    },
    layout: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
    height: "min-h-[80vh]",
  },
];
export default function Main() {
  return (
    <>
      <main className="bg-transparent text-center overflow-hidden">
        <div>
          <motion.section
            className={`flex flex-col justify-center items-center m-4 md:m-6`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.3 }}
          >
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                rotate: 2,
                transition: { type: "spring", stiffness: 150 },
              }}
              className="overflow-hidden rounded-3xl shadow-xl w-full h-[80vh] md:h-[75vh] lg:h-[85vh] bg-transparent"
            >
              <motion.img
                src={model2}
                alt={""}
                className="w-full h-full object-cover object-center"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.6 },
                }}
              />
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
    absolute bottom-8 left-1/2 -translate-x-1/2
    px-10 py-4
    bg-(--color-tiger)
    border-2 border-(--color-cornsilk)
    text-lg text-white
    shadow-md font-medium
    hover:bg-(--color-earth)
    transition-all
    flex items-center gap-2
    rounded-full
    cursor-pointer
  "
                >
                  Shop Now
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m0 0l-6-6m6 6l-6 6"
                    />
                  </motion.svg>
                </motion.button>
              </Link>
            </motion.div>
          </motion.section>
        </div>

        <div>
          {sections.map((section) => (
            <motion.section
              key={section.id}
              className={`flex flex-col justify-center items-center ${section.height} ${section.layout} m-4 md:m-6`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.3 }}
            >
              {section.images.map((img, i) => (
                <motion.div
                  key={i}
                  variants={section.animation}
                  whileHover={{
                    scale: 1.03,
                    rotate: i % 2 === 0 ? -1.5 : 1.5,
                    transition: { type: "spring", stiffness: 150 },
                  }}
                  className="overflow-hidden rounded-3xl w-full h-[60vh] md:h-[75vh] lg:h-[85vh] bg-transparent"
                >
                  <motion.img
                    src={img}
                    alt={`Model ${i}`}
                    className="w-full h-full object-cover object-center"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.6 },
                    }}
                  />
                </motion.div>
              ))}
            </motion.section>
          ))}
        </div>
      </main>
    </>
  );
}
