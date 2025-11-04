import { motion } from "framer-motion";
import { Package, ShoppingBag, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const orders = [
    {
      id: "ORD-1023",
      date: "2025-10-29",
      total: "850 EGP",
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-1024",
      date: "2025-11-01",
      total: "420 EGP",
      status: "Processing",
      items: 2,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 ">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-(--color-pakistan) mb-8"
      >
        My Orders
      </motion.h1>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600"
        >
          <ShoppingBag size={50} className="mx-auto mb-3 text-gray-400" />
          <p className="text-lg font-medium">You have no orders yet.</p>
          <p className="text-sm text-gray-500">
            Start shopping to see your orders here!
          </p>
        </motion.div>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {orders.map((order) => (
            <Link to={`/orders/${order.id}`}>
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl shadow-sm p-5 mb-4 flex items-center justify-between hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <Package className="text-(--color-tiger)" size={28} />
                  <div>
                    <p className="font-semibold text-(--color-pakistan)">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items} items • {order.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-(--color-pakistan)">
                    {order.total}
                  </p>
                  <p
                    className={`text-sm flex items-center gap-1 justify-end ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Processing"
                        ? "text-orange-500"
                        : "text-gray-500"
                    }`}
                  >
                    <Clock size={14} />
                    {order.status}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
