import { motion } from "framer-motion";
import {
  Truck,
  CreditCard,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import OrderProgress from "./orderProgress";

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();

  const order = {
    id: id || "ORD-1024",
    date: "2025-10-29",
    status: "Delivered",
    total: "850.00 EGP",
    paymentMethod: "Visa",
    address: "123 Nile Street, Cairo",
    governorate: "Giza",
    customer: {
      name: "Ahmed Mohamed",
      phone: "+201234567890",
    },
    items: [
      {
        id: 1,
        name: "Classic Hoodie",
        qty: 1,
        size: "L",
        price: 400,
        image: "/photo-1495385794356-15371f348c31.jpeg",
      },
      {
        id: 2,
        name: "Street Jacket",
        qty: 2,
        size: "M",
        price: 225,
        image: "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
      },
      {
        id: 2,
        name: "Street Jacket",
        qty: 2,
        size: "M",
        price: 225,
        image: "/premium_photo-1667520043080-53dcca77e2aa.jpeg",
      },
    ],
    trackingNumber: "1234567890",
    isPaid: true,
    isConfirmed: true,
    isShipped: true,
    isDelivered: true,
    isCanceled: false,
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-2xl shadow-xl w-full max-w-4xl p-4 border transition-colors duration-500
      ${!order.isCanceled && order.isPaid ? "border-green-500" : "border-(--color-earth)"}
      ${!order.isPaid && order.isCanceled ? "border-red-500" : "border-(--color-earth)"}
      ${!order.isPaid && !order.isCanceled ? "border-(--color-earth)" : ""}
    `}
      >
        {order.isPaid && (
          <div className="inline-flex items-center gap-2 mb-3 mr-1 text-green-600 font-bold rounded">
            <CheckCircle2 size={16} /> Paid
          </div>
        )}
        {order.isCanceled && (
          <div className="inline-flex items-center gap-2 mb-3 mr-1 text-red-600 font-bold rounded">
            <XCircle size={16} /> Canceled
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-pakistan)" }}
          >
            Order Details
          </h2>
          <span className="text-sm" style={{ color: "var(--color-dark)" }}>
            Order ID: {order.id}
          </span>
        </div>

        {/* Customer + Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Customer Info */}
          <div
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: "var(--color-cornsilk)",
              borderColor: "var(--color-earth)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-3 flex items-center gap-2"
              style={{ color: "var(--color-pakistan)" }}
            >
              <User size={18} /> Customer Information
            </h3>
            <p className="text-gray-700">
              <span className="font-medium">Full Name:</span>{" "}
              {order.customer.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> {order.customer.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Governorate:</span>{" "}
              {order.governorate}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <MapPin size={16} />
              <span className="font-medium">Address:</span> {order.address}
            </p>
          </div>

          {/* Order Info */}
          <div
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: "var(--color-cornsilk)",
              borderColor: "var(--color-earth)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--color-pakistan)" }}
            >
              Order Information
            </h3>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span> {order.date}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <CreditCard size={16} />
              <span className="font-medium">Payment Method:</span>{" "}
              {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Items */}
        <h3
          className="text-lg font-semibold border-b pb-2 mb-4"
          style={{
            color: "var(--color-pakistan)",
            borderColor: "var(--color-earth)",
          }}
        >
          Items in this Order
        </h3>

        <div className="grid sm:grid-cols-2 gap-5">
          {order.items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border shadow-sm hover:shadow-md transition p-4 flex flex-col"
              style={{
                backgroundColor: "var(--color-cornsilk)",
                borderColor: "var(--color-earth)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 rounded-lg object-cover mb-3"
              />
              <div className="flex flex-col gap-1">
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-pakistan)" }}
                >
                  {item.name}
                </p>
                <p className="text-sm" style={{ color: "var(--color-dark)" }}>
                  Size: <span className="font-medium">{item.size}</span>
                </p>
                <p className="text-sm" style={{ color: "var(--color-dark)" }}>
                  Quantity: <span className="font-medium">{item.qty}</span>
                </p>
                <p className="text-sm" style={{ color: "var(--color-dark)" }}>
                  Price per item:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-tiger)" }}
                  >
                    {item.price}.00 EGP
                  </span>
                </p>
                <p
                  className="text-base font-bold mt-1"
                  style={{ color: "var(--color-tiger)" }}
                >
                  Total: {item.price * item.qty}.00 EGP
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery */}
        <div
          className="mt-10 border-t pt-5"
          style={{ borderColor: "var(--color-earth)" }}
        >
          <h3
            className="text-lg font-semibold mb-3"
            style={{ color: "var(--color-pakistan)" }}
          >
            Delivery Information
          </h3>

          <div
            className="rounded-xl border p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
            style={{
              backgroundColor: "var(--color-cornsilk)",
              borderColor: "var(--color-earth)",
            }}
          >
            <div className="flex items-center gap-3">
              <Truck size={20} style={{ color: "var(--color-tiger)" }} />
              <div>
                <p
                  className="font-medium"
                  style={{ color: "var(--color-pakistan)" }}
                >
                  Delivery Method:{" "}
                  <span className="text-gray-700">Home Delivery</span>
                </p>
                <p className="text-sm" style={{ color: "var(--color-dark)" }}>
                  Estimated Delivery:{" "}
                  <span className="font-medium">2–3 days</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className="font-medium"
                style={{ color: "var(--color-pakistan)" }}
              >
                Delivery Fee:{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-tiger)" }}
                >
                  50.00 EGP
                </span>
              </p>
              <p className="text-sm" style={{ color: "var(--color-dark)" }}>
                Delivered by FastExpress
              </p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div
          className="mt-8 border-t pt-4 flex justify-between items-center"
          style={{ borderColor: "var(--color-earth)" }}
        >
          <p
            className="text-lg font-semibold"
            style={{ color: "var(--color-pakistan)" }}
          >
            Total:
          </p>
          <p
            className="text-xl font-bold"
            style={{ color: "var(--color-tiger)" }}
          >
            {order.total}
          </p>
        </div>

        <OrderProgress />
      </motion.div>
    </div>
  );
}
