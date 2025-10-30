import { CreditCard, Wallet, Truck, Phone } from "lucide-react";

const paymentMethods = [
  {
    name: "Cash on Delivery",
    icon: <Truck size={32} className="text-gray-600" />,
    description: "Pay when the product arrives at your door",
  },
  {
    name: "Debit Card",
    icon: <CreditCard size={32} className="text-gray-600" />,
    description: "Visa, Mastercard",
  },

  {
    name: "Vodafone Cash",
    icon: <Phone size={32} className="text-gray-600" />,
    description: "Secure mobile payment",
  },
  {
    name: "InstaPay",
    icon: <Wallet size={32} className="text-gray-600" />,
    description: "Fast digital payment",
  },
];

export default function PaymentSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-24 mb-6">
        Payment Methods
      </h2>

      <section className="max-w-7xl mx-auto px-6 bg-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{method.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{method.name}</h3>
              <p className="text-gray-500 text-sm">{method.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
