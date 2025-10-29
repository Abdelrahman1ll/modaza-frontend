import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import model1 from "/photo-1495385794356-15371f348c31.jpeg";
import model2 from "/premium_photo-1667520043080-53dcca77e2aa.jpeg";
import model3 from "/premium_photo-1673826949034-18367fc03955.jpeg";
import model4 from "/premium_photo-1681494700976-861938fe0513.jpeg";

type Section = {
  id: number;
  images: string[];
  height: string;
  layout: string;
  animation: Variants;
};
export default function Main() {
  const sections: Section[] = [
    {
      id: 3,
      images: [model2],
      animation: {
        hidden: { opacity: 0, y: -100, rotate: -5 },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 1, ease: "easeOut" },
        },
      },
      layout: "flex justify-center items-center",
      height: "min-h-[60vh] md:min-h-[100vh]",
    },
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
      layout:
        "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 place-items-center",
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

  return (
    <>
      <main className="bg-transparent text-center overflow-hidden">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            className={`flex flex-col justify-center items-center ${
              section.height
            } ${section.layout} w-full max-w-7xl mx-auto px-3 md:px-6 ${
              index === sections.length - 1 ? "mb-10" : "mb-4 md:mb-8"
            }`}
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
                className="overflow-hidden rounded-3xl shadow-xl w-full h-[55vh] md:h-[75vh] lg:h-[85vh] bg-transparent"
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
      </main>
    </>
  );
}
