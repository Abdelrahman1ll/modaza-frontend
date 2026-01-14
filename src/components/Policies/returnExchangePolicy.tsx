import { motion } from "framer-motion";
import {
  RotateCcw,
  ClipboardCheck,
  Truck,
  Wallet,
  AlertCircle,
  CircleDot,
} from "lucide-react";

/**
 * ReturnExchangePolicy: Rules for returns, exchanges, and refunds.
 * سياسة الاستبدال والاسترجاع: قواعد الإرجاع والاستبدال واسترداد الأموال.
 */
export default function ReturnExchangePolicy() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
            Customer Care
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-(--color-pakistan) tracking-tight"
          >
            Return &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
              Exchange
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
          {/* Section 1: Overview */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-pakistan)/5 text-(--color-pakistan) flex items-center justify-center shrink-0">
                <CircleDot size={20} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  1. Overview | نظرة عامة
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                We strive for your complete satisfaction. If you are not
                satisfied, you may request a return or exchange according to the
                terms below.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                نحرص على رضاكم الكامل عن مشترياتكم. إذا لم تكن راضيًا عن المنتج،
                يمكنك إرجاعه أو استبداله وفقًا للشروط التالية.
              </p>
            </div>
          </motion.section>

          {/* Section 2: Return Conditions */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-tiger)/5 text-(--color-tiger) flex items-center justify-center shrink-0">
                <ClipboardCheck size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  2. Return Conditions | شروط الإرجاع
                </h2>
              </div>
            </div>
            <div className="pl-16 grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-gray-50 p-6 rounded-3xl">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-tiger) mt-2 shrink-0" />
                  <p className="text-xs font-bold text-gray-600">
                    Must be within 7 days from receiving the shipment.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-tiger) mt-2 shrink-0" />
                  <p className="text-xs font-bold text-gray-600">
                    Must be in original condition with size tags attached.
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-right" dir="rtl">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-tiger) mt-2 shrink-0" />
                  <p className="text-xs font-bold text-gray-400">
                    يجب تقديم الطلب خلال 7 أيام من تاريخ الاستلام.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-tiger) mt-2 shrink-0" />
                  <p className="text-xs font-bold text-gray-400">
                    أن تكون في حالتها الأصلية ومرفق بها بطاقة المقاس.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Exchange Rules */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-earth)/5 text-(--color-earth) flex items-center justify-center shrink-0">
                <RotateCcw size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  3. Exchange Rules | سياسة الاستبدال
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <p className="text-sm font-bold text-(--color-pakistan)">
                  Important: Each shipment is eligible for only one operation
                  (Return OR Exchange).
                </p>
                <p className="text-xs font-bold text-gray-400 mt-1" dir="rtl">
                  تنبيه: يمكن لكل شحنة إجراء عملية واحدة فقط (إما استبدال أو
                  استرجاع).
                </p>
              </div>
              <p className="text-gray-700 text-sm font-bold leading-relaxed">
                Customers are responsible for any additional shipping fees for
                return or exchange.
              </p>
              <p
                className="text-gray-400 text-sm font-bold leading-relaxed"
                dir="rtl"
              >
                العميل مسؤول عن أي رسوم شحن إضافية تنشأ عند تنفيذ الاسترجاع أو
                الاستبدال.
              </p>
            </div>
          </motion.section>

          {/* Section 4: Refund Policy */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-pakistan)/5 text-(--color-pakistan) flex items-center justify-center shrink-0">
                <Wallet size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  4. Refund Policy | استرداد الأموال
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <p className="text-[10px] font-black text-(--color-tiger) uppercase tracking-widest mb-1">
                    Methods
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    InstaPay / Vodafone Cash
                  </p>
                </div>
                <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <p className="text-[10px] font-black text-(--color-tiger) uppercase tracking-widest mb-1">
                    Timeframe
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    Within 14 working days
                  </p>
                </div>
              </div>
              <div className="p-4 bg-orange-50/30 rounded-2xl border border-orange-100/50 flex items-center gap-3">
                <AlertCircle size={18} className="text-orange-500 shrink-0" />
                <p className="text-xs font-bold text-orange-900 leading-tight">
                  Refusing the order at the door incurs a 80 EGP fee.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Damaged Items */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  5. Damaged Items | المنتجات التالفة
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                If the received item is damaged or different, a free exchange is
                offered within 3 days without any extra fees.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                إذا كان المنتج تالفًا أو مختلفًا، نقدم استبدالًا مجانيًا خلال 3
                أيام دون أي رسوم إضافية.
              </p>
            </div>
          </motion.section>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-50 text-center flex flex-col items-center gap-2"
        >
          <Truck size={20} className="text-gray-200" />
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Dedicated to your satisfaction
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
