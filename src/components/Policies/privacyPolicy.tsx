import { motion } from "framer-motion";
import { Database, Eye, Lock, Share2, CircleDot } from "lucide-react";

/**
 * PrivacyPolicy: Data protection and privacy rules.
 * سياسة الخصوصية: حماية البيانات وقواعد الخصوصية.
 */
export default function PrivacyPolicy() {
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
            Data Protection
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-(--color-pakistan) tracking-tight"
          >
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
              Policy
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
                <Database size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  1. Information Collection | جمع المعلومات
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                We collect information you provide when registering, purchasing,
                or contacting us, including name, email, phone number, and
                shipping address.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                نحن نجمع المعلومات التي تقدمها لنا عند التسجيل أو إجراء عملية
                شراء أو التواصل معنا، بما في ذلك الاسم، البريد الإلكتروني، رقم
                الهاتف، وعنوان الشحن.
              </p>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-tiger)/5 text-(--color-tiger) flex items-center justify-center shrink-0">
                <Eye size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  2. Use of Information | استخدام المعلومات
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                We use the information to improve our services, process orders,
                communicate with customers, and send offers and updates.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                نستخدم المعلومات لتحسين خدماتنا، معالجة الطلبات، التواصل مع
                العملاء، وإرسال العروض والتحديثات المتعلقة بالمنتجات والخدمات.
              </p>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-earth)/5 text-(--color-earth) flex items-center justify-center shrink-0">
                <Lock size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  3. Data Protection | حماية المعلومات
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                We implement appropriate security measures to protect your
                personal data from unauthorized access or disclosure.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                نحن نتخذ التدابير الأمنية المناسبة لحماية معلوماتك الشخصية من
                الوصول غير المصرح به أو الاستخدام أو الكشف.
              </p>
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-(--color-pakistan)/5 text-(--color-pakistan) flex items-center justify-center shrink-0">
                <Share2 size={24} />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                  4. Sharing Information | مشاركة المعلومات
                </h2>
              </div>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-gray-700 font-bold leading-relaxed">
                We do not share your personal data with third parties for
                marketing without your consent, except with trusted partners for
                order processing and delivery.
              </p>
              <p className="text-gray-400 font-bold leading-relaxed" dir="rtl">
                لن نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية دون
                موافقتك، وقد نشاركها فقط مع شركائنا الموثوق بهم لأغراض معالجة
                الطلبات والشحن.
              </p>
            </div>
          </motion.section>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-50 text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Secure & Encrypted Experience
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
