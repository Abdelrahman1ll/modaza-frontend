import { motion } from "framer-motion";
import {
  FileText,
  UserCheck,
  Tags,
  Truck,
  ShieldCheck,
  CircleDot,
} from "lucide-react";

/**
 * TermsConditions: Legal agreement and usage rules.
 * الشروط والأحكام: الاتفاقية القانونية وقواعد الاستخدام.
 */
export default function TermsConditions() {
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
            Legal Information
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-(--color-pakistan) tracking-tight"
          >
            Terms &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
              Conditions
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
                <FileText size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  1. Acceptance of Terms | قبول الشروط
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                By using this website and purchasing its products, you agree to
                comply with these terms and all related policies.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                باستخدامك لهذا الموقع وشراء المنتجات منه، فإنك توافق على
                الالتزام بهذه الشروط والأحكام وجميع السياسات المرتبطة.
              </p>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-tiger)/5 text-(--color-tiger) flex items-center justify-center shrink-0">
                <UserCheck size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  2. User Account | حساب المستخدم
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                All provided information must be accurate and up to date. You
                are responsible for keeping your login data secure.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                يجب أن تكون جميع المعلومات التي تقدمها دقيقة ومحدثة. أنت مسؤول
                عن الحفاظ على سرية بيانات الدخول الخاصة بك.
              </p>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-earth)/5 text-(--color-earth) flex items-center justify-center shrink-0">
                <Tags size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  3. Products & Pricing | المنتجات والأسعار
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                We reserve the right to modify prices and offers at any time
                without prior notice. Displayed images may slightly differ from
                actual products.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                نحتفظ بالحق في تعديل الأسعار والعروض في أي وقت دون إشعار مسبق.
                قد تختلف الصور المعروضة عن المنتجات الفعلية قليلاً.
              </p>
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-pakistan)/5 text-(--color-pakistan) flex items-center justify-center shrink-0">
                <Truck size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  4. Payment & Delivery | الدفع والتسليم
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                All payments must be made through authorized methods. Delivery
                times are estimated and not guaranteed precisely.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                جميع المدفوعات يجب أن تتم عبر وسائل الدفع المصرح بها. نحن نسعى
                لتسليم المنتجات خلال المدة المحددة، ولكن لا يمكننا ضمان مواعيد
                دقيقة دائمًا.
              </p>
            </div>
          </motion.section>

          {/* Section 5 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-tiger)/5 text-(--color-tiger) flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  5. User Responsibility | مسؤولية المستخدم
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                You agree to use the website lawfully and not attempt any
                misuse, hacking, or violation of others' rights.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                أنت توافق على استخدام الموقع بطريقة قانونية وعدم إساءة استخدامه
                أو محاولة اختراقه أو انتهاك حقوق الغير.
              </p>
            </div>
          </motion.section>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-50 text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Last Updated: Jan 2026
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
