import { motion } from "framer-motion";
import {
  Truck,
  CreditCard,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";

import OrderProgress from "./orderProgress";
import useOrderDetails from "./useOrderDetails";

export default function OrderDetails() {
  const {
    order,
    specialSteps,
    actualIndex,
    formatEndDateArabic,
    refetchOrders,
    role,
  } = useOrderDetails();
  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-2xl shadow-xl w-full max-w-4xl p-4 border transition-colors duration-500
      ${
        !order?.isCanceled && order?.isPaid
          ? "border-green-500"
          : "border-(--color-earth)"
      }
      ${
        !order?.isPaid && order?.isCanceled
          ? "border-red-500"
          : "border-(--color-earth)"
      }
      ${!order?.isPaid && !order?.isCanceled ? "border-(--color-earth)" : ""}
    `}
      >
        {order?.isPaid && (
          <div className="inline-flex items-center gap-2 mb-3 mr-1 text-green-600 font-bold rounded">
            <CheckCircle2 size={16} /> Paid
          </div>
        )}
        {order?.isCanceled && (
          <div className="inline-flex items-center gap-2 mb-3 mr-1 text-red-600 font-bold rounded">
            <XCircle size={16} /> Canceled
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b pb-2 border-(--color-earth)">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-pakistan)" }}
          >
            Order Details
          </h2>
          <span className="text-sm" style={{ color: "var(--color-dark)" }}>
            Order ID: {order?.orderNumber}
          </span>
        </div>

        {/* Customer + Order Info */}
        {role !== "user" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-(--color-earth) pb-4">
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
                {order?.user?.firstName || "N/A"}{" "}
                {order?.user.lastName || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span>{" "}
                {order?.user.email || "N/A"}
              </p>

              <p className="text-gray-700">
                <span className="font-medium">Phone:</span>{" "}
                {order?.user.phone || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Birthday:</span>{" "}
                {order?.user.birthday || "N/A"}
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
                <span className="font-medium">Date:</span>{" "}
                {formatEndDateArabic(order?.createdAt || "")}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <CreditCard size={16} />
                <span className="font-medium">Payment Method:</span>{" "}
                {order?.paymentMethod}
              </p>
              <hr className="my-3 border-(--color-earth)" />

              <p className="text-gray-700">
                <span className="font-medium">Full Name:</span>{" "}
                {order?.addresses?.fullName || "N/A"}{" "}
                {order?.addresses?.lastName || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Country:</span>{" "}
                {order?.addresses.country || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">City:</span>{" "}
                {order?.addresses.city || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <MapPin size={16} />
                <span className="font-medium">Address:</span>{" "}
                {order?.addresses.address || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span>{" "}
                {order?.addresses.phone || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">PhoneOptional:</span>{" "}
                {order?.addresses.phoneOptional || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Items */}
        <h3
          className="text-lg font-semibold mt-2"
          style={{
            color: "var(--color-pakistan)",
            borderColor: "var(--color-earth)",
          }}
        >
          Items in this Order
        </h3>
        <div className="lg:col-span-2 p-4 rounded-2xl">
          {order?.items.length === 0 ? (
            <div className="flex flex-col items-center py-6">
              <ShoppingCart size={60} className="text-(--color-tiger) mb-4" />
              <p className="text-xl font-bold text-(--color-dark)">
                Your cart is empty
              </p>
              <button className="mt-4 px-6 py-2 rounded-full bg-(--color-tiger) text-white font-semibold hover:bg-(--color-earth) transition">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {order?.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex max-[580px]:flex-col md:flex-row items-center gap-4 p-4 rounded-xl shadow bg-(--color-cornsilk)"
                >
                  <div className="relative w-32 h-32">
                    {/* صورة المنتج */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />

                    {/* نسبة الخصم */}
                    {item.product.discountPercentage && (
                      <span className="absolute -top-1 -left-1 bg-(--color-tiger) text-white text-xs font-bold px-1 py-1 rounded-lg shadow-lg">
                        {item.product.discountPercentage}%
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold text-(--color-dark)">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center p-0.5 gap-2 bg-(--color-earth)/10 rounded-full border border-(--color-earth)/30">
                        <button
                          className="w-6 h-6 flex items-center justify-center text-white rounded-full transition"
                          style={{ backgroundColor: "var(--color-tiger)" }}
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          className="text-lg font-semibold"
                          style={{ color: "var(--color-dark)" }}
                        >
                          {item?.quantity}
                        </span>
                        <button className="w-6 h-6 flex items-center justify-center text-white rounded-full transition bg-(--color-tiger)">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <p className="text-(--color-pakistan) font-bold text-md mb-2">
                      {item.product.price} EGP
                    </p>
                    <div className="flex max-[685px]:flex-col justify-between ">
                      <div className="p-2 bg-(--color-earth)/10 rounded-xl border border-(--color-earth)/30 w-fit max-[470px]:w-full">
                        <p className="text-sm text-(--color-pakistan)">
                          <span className="font-semibold text-(--color-tiger)">
                            Size: {item?.sizes?.size}
                          </span>
                          <span className="ml-2 text-(--color-dark)">
                            (
                            <span className="font-medium text-(--color-pakistan)">
                              Length:
                            </span>{" "}
                            {item?.sizes.length} cm —{" "}
                            <span className="font-medium text-(--color-pakistan)">
                              Width:
                            </span>{" "}
                            {item?.sizes.width} cm)
                          </span>
                        </p>
                      </div>
                      <div className="text-lg font-bold text-(--color-dark) mt-2 text-end max-[685px]:mt-4">
                        {item?.price}.00 EGP
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Delivery */}
        <div
          className="mt-4 border-t pt-5"
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
                  {order?.deliveryPrice}.00 EGP
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
            {order?.totalPrice}.00 EGP
          </p>
        </div>

        {/* Order Progress */}
        <div
          className="mt-4 border-t pt-5"
          style={{ borderColor: "var(--color-earth)" }}
        >
          <h3
            className="text-lg font-semibold mb-6"
            style={{ color: "var(--color-pakistan)" }}
          >
            Order Progress
          </h3>

          <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto px-4">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-1/2 w-[88%] h-1 bg-gray-300 rounded-full -translate-x-1/2 -translate-y-1/2">
              <div
                className="h-1 bg-green-500 rounded-full transition-all duration-700"
                style={{
                  width:
                    actualIndex === -1
                      ? "0%"
                      : `${((actualIndex + 1) / specialSteps.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Steps */}
            {specialSteps.map((step) => {
              const Icon = step.icon;
              const active = order?.[step.key] === true;

              return (
                <div
                  key={step.label}
                  className="relative z-10 flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      active
                        ? "bg-green-500 border-green-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Icon
                      size={20}
                      style={{ color: active ? "white" : "gray" }}
                    />
                  </div>

                  <p
                    className={`text-sm font-medium ${
                      active ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {role !== "user" && (
          <OrderProgress order={order} refetch={refetchOrders} />
        )}
      </motion.div>
    </div>
  );
}
