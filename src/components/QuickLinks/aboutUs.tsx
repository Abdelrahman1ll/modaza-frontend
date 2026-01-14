import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Heart, CircleDot } from "lucide-react";

/**
 * AboutUs: Brand story and values presentation.
 * من نحن: عرض قصة العلامة التجارية وقيمها.
 */
export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const values = [
    {
      icon: Sparkles,
      en: "We are a contemporary clothing brand blending comfort and premium quality.",
      ar: "نحن علامة ملابس عصرية تجمع بين الراحة والجودة العالية.",
      color: "var(--color-tiger)",
    },
    {
      icon: ShieldCheck,
      en: "Our designs offer a calm, confident style for every occasion.",
      ar: "تصاميمنا تمنحك أسلوبًا هادئًا وواثقًا لكل مناسبة.",
      color: "var(--color-pakistan)",
    },
    {
      icon: Heart,
      en: "Combining practicality with refined taste to reflect your unique identity.",
      ar: "تجمع بين العملية والذوق الرفيع لتعكس هويتك الفريدة.",
      color: "var(--color-earth)",
    },
  ];

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 md:p-10 mt-10 md:mt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative w-full max-w-4xl bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-16 overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-(--color-tiger)/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-(--color-pakistan)/5 rounded-full blur-3xl -z-10" />

        <div className="text-center mb-16 space-y-4">
          <motion.span
            variants={itemVariants}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-(--color-tiger) block"
          >
            The Brand Story
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-(--color-pakistan) tracking-tight leading-none"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
              Us
            </span>
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-2"
          >
            <CircleDot size={12} className="text-(--color-tiger)" />
            <div className="w-12 h-[2px] bg-gray-100 mt-[5px]" />
            <CircleDot size={12} className="text-(--color-tiger)" />
          </motion.div>
        </div>

        <div className="space-y-12">
          {values.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-6 md:items-center group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110"
                style={{ backgroundColor: "white", color: item.color }}
              >
                <item.icon size={28} strokeWidth={2.5} />
              </div>

              <div className="space-y-2 grow">
                <p className="text-base md:text-lg font-bold text-(--color-pakistan) leading-relaxed">
                  {item.en}
                </p>
                <p
                  className="text-lg md:text-xl font-bold text-gray-400 leading-relaxed md:text-right"
                  dir="rtl"
                >
                  {item.ar}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Sign-off */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-100 text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Crafted for Excellence
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
