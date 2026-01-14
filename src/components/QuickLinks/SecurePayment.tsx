import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Globe,
  Activity,
  Smartphone,
} from "lucide-react";

/**
 * SecurePayment: Technical overview of transaction security measures.
 * الدفع الآمن: نظرة تقنية على تدابير أمن المعاملات.
 */
export default function SecurePayment() {
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

  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: "End-to-End Encryption",
      titleAr: "تشفير البيانات بالكامل",
      desc: "Your data is encrypted using 256-bit SSL technology, ensuring total privacy.",
      descAr: "بياناتك مشفرة باستخدام تقنية SSL 256-bit لضمان الخصوصية التامة.",
      color: "var(--color-pakistan)",
    },
    {
      icon: Lock,
      title: "PCI DSS Compliant",
      titleAr: "معايير أمان عالمية",
      desc: "All transactions are processed through certified gateways meeting international standards.",
      descAr:
        "تتم جميع المعاملات من خلال بوابات دفع معتمدة تلتزم بالمعايير الدولية.",
      color: "var(--color-tiger)",
    },
    {
      icon: Smartphone,
      title: "Direct & Fast Payments",
      titleAr: "دفع مباشر وسريع",
      desc: "Official support for InstaPay and Vodafone Cash for immediate secured transfers.",
      descAr:
        "دعم رسمي لخدمات إنستاباي وفودافون كاش لضمان تحويلات آمنة وفورية.",
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
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-(--color-tiger)/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-(--color-pakistan)/5 rounded-full blur-[120px] -z-10" />

        <div className="text-center mb-20 space-y-6">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 border border-green-100"
          >
            <Activity size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Server Secure
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.span
              variants={itemVariants}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-(--color-tiger) block"
            >
              Transaction Security
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-7xl font-black text-(--color-pakistan) tracking-tight"
            >
              Secure{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
                Payments
              </span>
            </motion.h1>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-3"
          >
            {[Globe, ShieldCheck, Lock].map((Icon, i) => (
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
          {securityFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-white/50 p-8 rounded-4xl border border-white/80 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:rotate-360 transition-transform duration-700"
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

        {/* Technical Badges Banner */}
        <motion.div
          variants={itemVariants}
          className="mt-20 p-8 rounded-3xl bg-gray-50/50 border border-gray-100 flex flex-wrap items-center justify-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              SSL Secure
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              256-Bit AES
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              PCI Certified
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
            © {new Date().getFullYear()} Modeza Boutique — Encrypted Connection
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
