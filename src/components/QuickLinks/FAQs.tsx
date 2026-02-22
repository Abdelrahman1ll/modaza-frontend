import { motion } from "framer-motion";
import {
  Package,
  RotateCcw,
  CreditCard,
  HelpCircle,
  CircleDot,
} from "lucide-react";

/**
 * FAQs: Frequently Asked Questions with modern categorized layout.
 * الأسئلة الشائعة: الأسئلة الأكثر شيوعاً بتصميم عصري مصنف.
 */
export default function FAQs() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const categories = [
    {
      title: "Shipping & Delivery",
      titleAr: "الشحن والتوصيل",
      icon: Package,
      color: "var(--color-tiger)",
      questions: [
        {
          q: "What if I received a wrong item or an item is missing?",
          qAr: "ماذا لو استلمت منتجًا خاطئًا أو مفقودًا؟",
          a: "We urge our customers to check items immediately... Contact us immediately if there's an issue.",
          aAr: "نحث عملائنا على التحقق من المنتجات فور استلامها... اتصل بنا فورًا إذا كان هناك أي خطأ.",
        },
        {
          q: "How long does delivery take?",
          qAr: "كم تستغرق مدة التوصيل؟",
          a: "Delivery takes 3–7 working days across most regions of Egypt.",
          aAr: "مدة التوصيل من 3 إلى 7 أيام عمل في معظم محافظات مصر.",
        },
      ],
    },
    {
      title: "Exchange & Return",
      titleAr: "الاسترجاع والاستبدال",
      icon: RotateCcw,
      color: "var(--color-pakistan)",
      questions: [
        {
          q: "Do you offer refunds?",
          qAr: "هل تقدمون استرداد الأموال؟",
          a: "Please contact us for refund policy details.",
          aAr: "يرجى التواصل معنا لمعرفة سياسة الاسترداد.",
        },
        {
          q: "Who pays shipping costs for a refund?",
          qAr: "من يتحمل رسوم الشحن عند الاسترداد؟",
          a: "Customer pays shipping costs when free shipping was applied.",
          aAr: "يتحمل العميل رسوم الشحن في حالة الاسترداد للطلبات المجانية الشحن.",
        },
      ],
    },
    {
      title: "Payments & Orders",
      titleAr: "الدفع والطلبات",
      icon: CreditCard,
      color: "var(--color-earth)",
      questions: [
        {
          q: "How can I apply the discount code?",
          qAr: "كيف يمكنني استخدام كود الخصم؟",
          a: "Enter your code at checkout under 'Apply Discount Code' and click Apply.",
          aAr: "أدخل كود الخصم عند الدفع تحت 'تطبيق كود الخصم' ثم اضغط تطبيق.",
        },
        {
          q: "I am not comfortable with online orders. What do I do?",
          qAr: "لست مرتاحًا للشراء أونلاين، ماذا أفعل؟",
          a: "We offer Pay on Delivery. Inspect products before accepting.",
          aAr: "نوفر الدفع عند الاستلام. تحقق من المنتج قبل استلامه.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 md:px-10 mt-10 md:mt-16 bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-20 space-y-4">
          <motion.span
            variants={itemVariants}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-(--color-tiger) block"
          >
            Help Center
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-7xl font-black text-(--color-pakistan) tracking-tight"
          >
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
              Questions
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-gray-500 font-medium max-w-lg mx-auto"
          >
            Everything you need to know about our premium boutique services,
            shipping, and returns.
          </motion.p>
        </div>

        <div className="space-y-24">
          {categories.map((category, catIdx) => (
            <section key={catIdx} className="space-y-10">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 mb-8"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "white", color: category.color }}
                >
                  <category.icon size={24} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-black uppercase tracking-widest text-(--color-pakistan)">
                    {category.title}
                  </h2>
                  <p className="text-xs font-bold text-gray-400" dir="rtl">
                    {category.titleAr}
                  </p>
                </div>
                <div className="h-px flex-1 bg-gray-100 hidden md:block" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.questions.map((faq, faqIdx) => (
                  <motion.div
                    key={faqIdx}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white/70 backdrop-blur-xl p-8 rounded-4xl border border-white/50 shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CircleDot
                          size={14}
                          className="text-(--color-tiger) mt-1 shrink-0"
                        />
                        <div className="space-y-1">
                          <p className="text-base font-black text-(--color-pakistan) leading-tight">
                            {faq.q}
                          </p>
                          <p
                            className="text-sm font-bold text-gray-400 leading-tight"
                            dir="rtl"
                          >
                            {faq.qAr}
                          </p>
                        </div>
                      </div>

                      <div className="pl-6 space-y-2 border-l-2 border-gray-50">
                        <p className="text-sm font-medium text-gray-600 leading-relaxed">
                          {faq.a}
                        </p>
                        <p
                          className="text-sm font-medium text-gray-400 leading-relaxed"
                          dir="rtl"
                        >
                          {faq.aAr}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end opacity-20 group-hover:opacity-100 transition-opacity">
                      <HelpCircle size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Support Call to Action */}
        <motion.div
          variants={itemVariants}
          className="mt-24 p-12 rounded-[3rem] bg-linear-to-r from-(--color-pakistan) to-(--color-tiger) text-white text-center shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-black">Still have questions?</h3>
            <p className="opacity-80 font-medium max-w-md mx-auto">
              We're here to help you 24/7. Reach out to our support team for any
              further assistance.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
