import { motion } from "framer-motion";
import { Truck, MapPin, Clock, CreditCard } from "lucide-react";
import { useGetDeliveryQuery } from "../../redux/Delivery/apiDelivery";

/**
 * ShippingDelivery: Details on shipping rates and delivery times.
 * الشحن والتوصيل: تفاصيل عن أسعار الشحن ومواعيد التسليم.
 */
export default function ShippingDelivery() {
  const { data, isLoading } = useGetDeliveryQuery({});

  const deliveryData = data?.deliveries?.find(
    (d: { id: number }) => d.id === 1,
  );

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

  const shippingInfo = [
    {
      icon: Truck,
      en: "Standard Shipping: Nationwide coverage across all governorates.",
      ar: "الشحن القياسي: تغطية شاملة لجميع محافظات الجمهورية.",
      price: isLoading
        ? "..."
        : `${deliveryData?.deliveryPriceClose || 60} EGP`,
      type: "Most Governorates",
      color: "var(--color-pakistan)",
    },
    {
      icon: MapPin,
      en: "Southern Governorates & South Sinai (Upper Egypt, Sharm El Sheikh).",
      ar: "محافظات الجنوب وسيناء الجنوبية (صعيد مصر، شرم الشيخ).",
      price: isLoading ? "..." : `${deliveryData?.deliveryPriceFar || 80} EGP`,
      type: "Southern Areas",
      color: "var(--color-tiger)",
    },
    {
      icon: Clock,
      en: "Delivery Timeframe: Usually takes 3–7 working days.",
      ar: "مدة التوصيل: تستغرق عادة من 3 إلى 7 أيام عمل.",
      price: "3-7 Days",
      type: "Fast Delivery",
      color: "var(--color-earth)",
    },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-10 mt-10 md:mt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative w-full max-w-5xl bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-16 overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-(--color-tiger)/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-(--color-pakistan)/5 rounded-full blur-[100px] -z-10" />

        <div className="text-center mb-16 space-y-4">
          <motion.span
            variants={itemVariants}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-(--color-tiger) block"
          >
            Logistics & Delivery
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-(--color-pakistan) tracking-tight"
          >
            Shipping{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
              Policy
            </span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shippingInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative bg-white/80 p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform"
                style={{
                  backgroundColor: `${info.color}10`,
                  color: info.color,
                }}
              >
                <info.icon size={32} strokeWidth={2.5} />
              </div>

              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {info.type}
                  </p>
                  <p className="text-2xl font-black text-(--color-pakistan)">
                    {info.price}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-50">
                  <p className="text-xs font-bold text-gray-600 leading-relaxed capitalize">
                    {info.en}
                  </p>
                  <p
                    className="text-xs font-bold text-gray-400 leading-relaxed md:text-sm"
                    dir="rtl"
                  >
                    {info.ar}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          variants={itemVariants}
          className="mt-16 p-6 rounded-3xl bg-(--color-pakistan)/5 border border-(--color-pakistan)/10 flex items-center justify-center gap-4"
        >
          <CreditCard className="text-(--color-pakistan)" size={20} />
          <p className="text-[10px] font-black uppercase tracking-widest text-(--color-pakistan)">
            Secure Payments Upon Delivery or Online
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
