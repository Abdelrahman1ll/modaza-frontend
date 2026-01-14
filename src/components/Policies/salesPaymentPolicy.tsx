import { motion } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  DollarSign,
  CheckCircle,
  CircleDot,
} from "lucide-react";

/**
 * SalesPaymentPolicy: Terms for sales transactions and payment security.
 * سياسة البيع والدفع: شروط عمليات البيع وأمن الدفع.
 */
export default function SalesPaymentPolicy() {
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-10 mt-10 md:mt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-16 overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-(--color-tiger)/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-(--color-pakistan)/5 rounded-full blur-[100px] -z-10" />

        <div className="text-center mb-16 space-y-4">
          <motion.span
            variants={itemVariants}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-(--color-tiger) block"
          >
            Transaction Terms
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-(--color-pakistan) tracking-tight"
          >
            Sales &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
              Payment
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
          {/* Section 1 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-pakistan)/5 text-(--color-pakistan) flex items-center justify-center shrink-0">
                <ShoppingCart size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  1. Overview | نظرة عامة
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                This policy outlines the terms related to sales and payment when
                purchasing from our boutique.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                توضح هذه السياسة الشروط المتعلقة بعمليات البيع والدفع عند الشراء
                من متجرنا.
              </p>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-tiger)/5 text-(--color-tiger) flex items-center justify-center shrink-0">
                <DollarSign size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  2. Prices & Offers | الأسعار والعروض
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                Prices are displayed in local currency (EGP) and may include
                applicable taxes. Offers are subject to availability.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                الأسعار معروضة بالعملة المحلية وقد تشمل الضرائب المطبقة. العروض
                تخضع للتوفر وقد تكون لفترة محدودة.
              </p>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-earth)/5 text-(--color-earth) flex items-center justify-center shrink-0">
                <CreditCard size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  3. Payment Methods | طرق الدفع
                </h2>
              </div>
            </div>
            <div className="pl-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Bank Cards",
                "Cash on Delivery",
                "InstaPay",
                "Vodafone Cash",
              ].map((method, idx) => (
                <div
                  key={idx}
                  className="bg-white/50 p-3 rounded-2xl border border-gray-100 text-center"
                >
                  <p className="text-[10px] font-black uppercase text-(--color-pakistan)">
                    {method}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-pakistan)/5 text-(--color-pakistan) flex items-center justify-center shrink-0">
                <CheckCircle size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  4. Order Confirmation | تأكيد الطلب
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                You can view your order details, including status and payment
                method, directly from your Order page on the website.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                يمكنك عرض تفاصيل طلبك، بما في ذلك الحالة وطريقة الدفع، مباشرة من
                صفحة الطلب في الموقع.
              </p>
            </div>
          </motion.section>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-50 text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Secure & Trusted Transactions
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
