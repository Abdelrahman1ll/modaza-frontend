import { motion } from "framer-motion";
import { ShieldOff, Globe, MapPin } from "lucide-react";
import { BRAND_NAME } from "../BrandText";

/**
 * AccessDenied Page: Displayed when a user tries to access the site from outside Egypt.
 * صفحة تقييد الوصول: تظهر عند محاولة الدخول للموقع من خارج مصر.
 */
export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-(--color-cornsilk) flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Decorative background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-(--color-tiger) blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-(--color-pakistan) blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full space-y-12 relative z-10"
      >
        {/* Branding */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-(--color-pakistan)"
          >
            {BRAND_NAME}
          </motion.h1>
          <div className="h-1 w-24 bg-(--color-tiger) mx-auto rounded-full" />
        </div>

        {/* Visual Icon */}
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            className="bg-white/50 backdrop-blur-md p-8 rounded-full shadow-2xl border border-white/40"
          >
            <ShieldOff className="w-16 h-16 text-(--color-tiger)" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-(--color-earth)/30 rounded-full"
          />
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-(--color-pakistan) leading-tight">
              Service Restricted <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
                الموقع متاح في مصر فقط
              </span>
            </h2>
            <p className="text-lg md:text-xl text-(--color-dark)/80 font-medium max-w-lg mx-auto">
              Currently, {BRAND_NAME} exclusive collection is only available to our customers within the borders of Egypt.
              <br />
              حالياً، تشكيلة {BRAND_NAME} الحصرية متاحة فقط لعملائنا داخل حدود جمهورية مصر العربية.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/60 shadow-sm flex items-center space-x-4 rtl:space-x-reverse"
            >
              <div className="p-3 bg-(--color-cornsilk) rounded-xl">
                <Globe className="w-6 h-6 text-(--color-pakistan)" />
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-(--color-tiger)">Coverage</p>
                <p className="text-sm font-semibold text-(--color-pakistan)">Egypt Only / مصر فقط</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/60 shadow-sm flex items-center space-x-4 rtl:space-x-reverse"
            >
              <div className="p-3 bg-(--color-cornsilk) rounded-xl">
                <MapPin className="w-6 h-6 text-(--color-pakistan)" />
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-(--color-tiger)">Status</p>
                <p className="text-sm font-semibold text-(--color-pakistan)">Expanding Soon / التوسع قريباً</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2 }}
          className="text-xs font-medium tracking-[0.2em] text-(--color-dark) uppercase"
        >
          &copy; {new Date().getFullYear()} {BRAND_NAME} - Premium Quality
        </motion.p>
      </motion.div>
    </div>
  );
}
