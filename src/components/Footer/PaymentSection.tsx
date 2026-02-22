import { CreditCard, Wallet, Truck, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const paymentMethods = [
  {
    name: "Cash on Delivery",
    icon: <Truck size={32} />,
    description: "Pay when the product arrives at your door",
  },
  {
    name: "Debit Card",
    icon: <CreditCard size={32} />,
    description: "Visa, Mastercard",
  },
  {
    name: "Vodafone Cash",
    icon: <Wallet size={32} />,
    description: "Secure mobile payment",
  },
  {
    name: "InstaPay",
    icon: <Smartphone size={32} />,
    description: "Fast digital payment",
  },
];

export default function PaymentSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-8 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-(--color-tiger)/5rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4 tracking-tight">
          Flexible Payment Options
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto font-medium">
          Choose the method that suits you best. We support various secure
          payment channels for your convenience.
        </p>
      </motion.div>

      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group flex flex-col items-center text-center p-4 bg-white/40 backdrop-blur-xl border border-gray-200/50 rounded-3xl transition-all duration-300"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white shadow-sm text-gray-700 group-hover:bg-(--color-tiger) group-hover:text-white transition-colors duration-300">
                {method.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-(--color-tiger) transition-colors">
                {method.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {method.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
