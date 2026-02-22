import { motion } from "framer-motion";
import {
  Globe,
  Plane,
  Truck,
  MapPin,
  Search,
  Navigation,
  Activity,
} from "lucide-react";

/**
 * WorldwideShipping: Overview of global delivery capabilities and tracking.
 * الشحن الدولي: نظرة عامة على قدرات التوصيل العالمية والتتبع.
 */
export default function WorldwideShipping() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  const shippingFeatures = [
    {
      icon: Globe,
      title: "All Governorates",
      titleAr: "جميع المحافظات",
      desc: "We deliver our luxury boutique collections to every city and governorate across Egypt.",
      descAr:
        "نقوم بتوصيل مجموعاتنا الفاخرة إلى كل مدينة ومحافظة في جميع أنحاء مصر.",
      color: "var(--color-pakistan)",
    },
    {
      icon: Plane,
      title: "Domestic Logistics",
      titleAr: "خدمات لوجستية محلية",
      desc: "Orders are handled by premium local couriers to ensure safety and speed.",
      descAr:
        "يتم التعامل مع الطلبات من قبل شركات نقل محلية ممتازة لضمان الأمان والسرعة.",
      color: "var(--color-tiger)",
    },
    {
      icon: Search,
      title: "Real-time Tracking",
      titleAr: "تتبع اللحظي",
      desc: "Complete transparency with step-by-step tracking from our warehouse to your door.",
      descAr: "شفافية كاملة مع تتبع خطوة بخطوة من مستودعنا إلى باب منزلك.",
      color: "var(--color-earth)",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 md:px-10 mt-10 md:mt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-16 overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-(--color-pakistan)/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-(--color-tiger)/5 rounded-full blur-[120px] -z-10" />

        <div className="text-center mb-20 space-y-6">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100"
          >
            <Activity size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Logistics Network Active
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.span
              variants={itemVariants}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-(--color-tiger) block"
            >
              Domestic Delivery
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-7xl font-black text-(--color-pakistan) tracking-tight"
            >
              Shipping in{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
                Egypt
              </span>
            </motion.h1>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-3"
          >
            {[Navigation, Truck, MapPin].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-50 flex items-center justify-center text-gray-300"
              >
                <Icon size={18} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shippingFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-white/50 p-8 rounded-4xl border border-white/80 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundColor: `${feature.color}10`,
                  color: feature.color,
                }}
              >
                <feature.icon size={32} strokeWidth={2.5} />
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                    {feature.title}
                  </h2>
                  <p className="text-[10px] font-black text-gray-400" dir="rtl">
                    {feature.titleAr}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100/50">
                  <p className="text-xs font-bold text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                  <p
                    className="text-xs font-bold text-gray-400 leading-relaxed"
                    dir="rtl"
                  >
                    {feature.descAr}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Logistics Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-20 p-8 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center"
        >
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-black text-(--color-pakistan)">
              27
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Governorates
            </p>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200" />
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-black text-(--color-pakistan)">
              3-7
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Business Days
            </p>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200" />
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-black text-(--color-pakistan)">
              24/7
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Order Tracking
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
            © {new Date().getFullYear()} Modeza Boutique — Connecting Fashion
            Across Egypt
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
