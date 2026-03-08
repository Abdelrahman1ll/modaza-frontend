import { motion } from "framer-motion";
import {
  Truck,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Calendar,
  Phone,
  Mail,
  CreditCard,
  Package,
} from "lucide-react";

import OrderProgress from "./orderProgress";
import useOrderDetails from "./useOrderDetails";
import { SkeletonList } from "../Skeleton";

interface OrderItemType {
  id: number;
  product: {
    name: string;
    images: string[];
    discountPercentage?: number;
    price: number;
  };
  quantity: number;
  sizes: {
    size: string;
    length: number;
    width: number;
  };
  price: number;
}

/**
 * OrderDetails: Comprehensive view of a single order, including items, shipping, and status history.
 * تفاصيل الطلب: عرض شامل لطلب واحد، بما في ذلك العناصر، الشحن، وسجل الحالة.
 */
export default function OrderDetails() {
  const {
    order,
    specialSteps,
    actualIndex,
    formatEndDateArabic,
    refetchOrders,
    role,
    isLoadingOrders,
  } = useOrderDetails();

  const paymentMethod =
    order?.paymentMethod === "credit_card"
      ? "Credit Card"
      : order?.paymentMethod === "cash_on_delivery"
        ? "Cash on Delivery"
        : order?.paymentMethod === "vodafone_cash"
          ? "Vodafone Cash"
          : order?.paymentMethod === "instaPay"
            ? "InstaPay"
            : order?.paymentMethod === "paypal"
              ? "PayPal"
              : "Payment";

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="flex justify-center mt-12 mb-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: "var(--color-pakistan)" }}
        >
          Order Details
        </motion.h2>
      </div>

      <div className="min-h-screen flex justify-center items-start pb-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-5xl p-5 md:p-8 border transition-all duration-500
      ${
        !order?.isCanceled && order?.isPaid
          ? "border-green-500/30 ring-1 ring-green-500/10"
          : "border-(--color-tiger)/40"
      }
      ${
        !order?.isPaid && order?.isCanceled
          ? "border-red-500/30 ring-1 ring-red-500/10"
          : "border-(--color-tiger)/40"
      }
    `}
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {order?.isPaid && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 text-sm font-bold rounded-full border border-green-500/20 shadow-sm"
              >
                <CheckCircle2 size={16} /> Paid
              </motion.div>
            )}
            {order?.isCanceled && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 text-sm font-bold rounded-full border border-red-500/20 shadow-sm"
              >
                <XCircle size={16} /> Canceled
              </motion.div>
            )}
          </div>

          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-(--color-tiger)/20 pb-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl bg-(--color-tiger)/10"
                style={{ color: "var(--color-tiger)" }}
              >
                <CreditCard size={24} />
              </div>
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--color-pakistan)" }}
                >
                  {paymentMethod}
                </h2>
                {role !== "user" && order?.paymentId && (
                  <p className="text-sm text-(--color-tiger)/60 font-medium">
                    Transaction: {order.paymentId}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 bg-(--color-tiger)/5 px-4 py-2 rounded-xl border border-(--color-tiger)/10">
              <span
                className="text-sm font-bold"
                style={{ color: "var(--color-tiger)" }}
              >
                ID: {order?.orderNumber}
              </span>
            </div>
          </motion.div>

          {/* Customer + Order Info */}
          {role !== "user" && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
            >
              {/* Customer Info */}
              <div className="group rounded-3xl p-5 border border-(--color-tiger)/10 bg-(--color-tiger)/5 hover:bg-(--color-tiger)/10 transition-all duration-300 shadow-sm hover:shadow-md">
                <h3
                  className="text-lg font-bold mb-5 flex items-center gap-3"
                  style={{ color: "var(--color-pakistan)" }}
                >
                  <div className="p-2 bg-(--color-pakistan)/10 rounded-lg">
                    <User size={18} />
                  </div>
                  Customer Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <User size={14} className="text-(--color-pakistan)" />
                    </div>
                    <div>
                      <p className="text-xs text-(--color-pakistan)/40 uppercase font-bold tracking-widest">
                        Name
                      </p>
                      <p className="text-gray-700 font-semibold italic">
                        {order?.user?.firstName || "N/A"}{" "}
                        {order?.user.lastName || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Mail size={14} className="text-(--color-pakistan)" />
                    </div>
                    <div>
                      <p className="text-xs text-(--color-pakistan)/40 uppercase font-bold tracking-widest">
                        Email
                      </p>
                      <p className="text-gray-700 font-semibold italic">
                        {order?.user.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Phone size={14} className="text-(--color-pakistan)" />
                    </div>
                    <div>
                      <p className="text-xs text-(--color-pakistan)/40 uppercase font-bold tracking-widest">
                        Phone
                      </p>
                      <p className="text-(--color-tiger) font-semibold italic">
                        {order?.user.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar size={14} className="text-(--color-pakistan)" />
                    </div>
                    <div>
                      <p className="text-xs text-(--color-pakistan)/40 uppercase font-bold tracking-widest">
                        Birthday
                      </p>
                      <p className="text-(--color-tiger) font-semibold italic">
                        {formatEndDateArabic(order?.user.birthday || "") ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div className="group rounded-3xl p-5 border border-(--color-tiger)/10 bg-(--color-tiger)/5 hover:bg-(--color-tiger)/10 transition-all duration-300 shadow-sm hover:shadow-md">
                <h3
                  className="text-lg font-bold mb-5 flex items-center gap-3"
                  style={{ color: "var(--color-pakistan)" }}
                >
                  <div className="p-2 bg-(--color-pakistan)/10 rounded-lg">
                    <MapPin size={18} />
                  </div>
                  Shipping Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <User size={14} className="text-(--color-pakistan)" />
                    </div>
                    <div>
                      <p className="text-xs text-(--color-pakistan)/40 uppercase font-bold tracking-widest">
                        Recipient
                      </p>
                      <p className="text-(--color-tiger) font-semibold italic">
                        {order?.addresses?.fullName || "N/A"}{" "}
                        {order?.addresses?.lastName || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <MapPin size={14} className="text-(--color-pakistan)" />
                    </div>
                    <div>
                      <p className="text-xs text-(--color-pakistan)/40 uppercase font-bold tracking-widest">
                        Location
                      </p>
                      <p className="text-(--color-tiger) font-semibold italic">
                        {order?.addresses.city}, {order?.addresses.country}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order?.addresses.address || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Phone size={14} className="text-(--color-tiger)" />
                    </div>
                    <div>
                      <p className="text-xs text-(--color-pakistan)/40 uppercase font-bold tracking-widest">
                        Contact
                      </p>
                      <p className="text-(--color-tiger) font-semibold italic">
                        {order?.addresses.phone || "N/A"}
                      </p>
                      {order?.addresses.phoneOptional && (
                        <p className="text-sm text-gray-500">
                          Alt: {order.addresses.phoneOptional}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar size={14} className="text-(--color-tiger)" />
                    </div>
                    <div>
                      <p className="text-xs text-(--color-pakistan)/40 uppercase font-bold tracking-widest">
                        Ordered On
                      </p>
                      <p className="text-(--color-tiger) font-semibold italic">
                        {formatEndDateArabic(order?.createdAt || "")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Items */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3
              className="text-xl font-bold mb-6 flex items-center gap-3"
              style={{ color: "var(--color-pakistan)" }}
            >
              <div className="p-2 bg-(--color-pakistan)/10 rounded-lg">
                <Package size={20} />
              </div>
              Order Items
            </h3>

            <div className="space-y-6">
              {isLoadingOrders ? (
                <SkeletonList count={3} />
              ) : !order || order?.items?.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-20 bg-(--color-tiger)/5 rounded-3xl border border-dashed border-(--color-tiger)/30"
                >
                  <div className="p-6 rounded-full bg-(--color-tiger)/10 mb-6">
                    <ShoppingBag
                      size={60}
                      className="text-(--color-tiger)/40"
                    />
                  </div>
                  <p className="text-2xl font-bold text-(--color-tiger)/40 mb-2">
                    No items found
                  </p>
                  <p className="text-(--color-tiger)/40 italic">
                    This order appears to be empty
                  </p>
                </motion.div>
              ) : (
                <div className="grid gap-4">
                  {order?.items?.map((item: OrderItemType) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01, x: 5 }}
                      className="group flex flex-col sm:flex-row items-center gap-5 p-3 rounded-2xl border border-(--color-tiger)/10 bg-white/60 hover:border-(--color-tiger)/30 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-2xl">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {item.product.discountPercentage && (
                          <div className="absolute top-2 left-2 bg-(--color-tiger) text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-wider">
                            {item.product.discountPercentage}% OFF
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-bold text-(--color-tiger) group-hover:text-pakistan transition-colors">
                              {item.product.name}
                            </h4>
                            <p className="text-(--color-tiger) font-bold text-lg">
                              {item.product.price.toLocaleString()} EGP
                            </p>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-1.5 bg-(--color-tiger)/5 rounded-full border border-(--color-tiger)/10">
                            <span className="text-xs font-bold text-(--color-tiger)/40 uppercase">
                              Qty
                            </span>
                            <span className="text-sm font-black text-(--color-tiger)">
                              {item?.quantity}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                          <div className="flex items-center gap-2 px-2 py-1 bg-(--color-tiger)/5 rounded-xl border border-(--color-tiger)/10">
                            <span className="text-[10px] font-black uppercase text-(--color-pakistan) tracking-widest">
                              Selected Size
                            </span>
                            <span className="text-lg font-bold text-(--color-tiger)">
                              {item?.sizes?.size}
                            </span>
                            <span className="text-[15px] text-(--color-pakistan) uppercase font-medium">
                              ({item?.sizes.length}L × {item?.sizes.width}W)
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-black uppercase text-(--color-pakistan)/40 tracking-widest leading-none mb-1">
                              Subtotal
                            </p>
                            <p className="text-lg font-black text-(--color-tiger)">
                              {item?.price.toLocaleString()}.00 EGP
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
          {/* Delivery & Total */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-8 mb-8 border-t border-(--color-tiger)/10 pt-8"
          >
            <div className="flex flex-col gap-4">
              <h3
                className="text-lg font-bold flex items-center gap-3"
                style={{ color: "var(--color-pakistan)" }}
              >
                <div className="p-2 bg-(--color-pakistan)/10 rounded-lg">
                  <Truck size={18} />
                </div>
                Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-(--color-tiger)/5 border border-(--color-tiger)/20 flex items-center gap-4 hover:bg-(--color-tiger)/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-(--color-tiger)/10 flex items-center justify-center shrink-0">
                    <Truck size={20} className="text-(--color-tiger)" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-(--color-tiger)/40 tracking-widest">
                      Method
                    </p>
                    <p className="text-sm font-bold text-(--color-tiger) italic">
                      Home Delivery
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-(--color-tiger)/5 border border-(--color-tiger)/20 flex items-center gap-4 hover:bg-(--color-tiger)/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-(--color-tiger)/10 flex items-center justify-center shrink-0">
                    <Calendar size={20} className="text-(--color-tiger)" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-(--color-tiger)/40 tracking-widest">
                      Timeline
                    </p>
                    <p className="text-sm font-bold text-(--color-tiger) italic">
                      3 - 7 Business Days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 rounded-3xl bg-(--color-tiger)/5 text-(--color-tiger) shadow-xl relative overflow-hidden group w-full">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-[13px] font-black uppercase tracking-[0.2em] mb-4">
                Final Summary
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center opacity-80">
                  <span className="text-xs font-semibold">Subtotal</span>
                  <span className="text-sm font-bold italic">
                    {(
                      (order?.totalPrice ?? 0) - (order?.deliveryPrice ?? 0)
                    ).toLocaleString()}
                    .00 EGP
                  </span>
                </div>
                <div className="flex justify-between items-center opacity-80">
                  <span className="text-xs font-semibold">Shipping</span>
                  <span className="text-sm font-bold italic">
                    {(order?.deliveryPrice ?? 0).toLocaleString()}.00 EGP
                  </span>
                </div>
                <div className="h-px bg-(--color-tiger)/20 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black uppercase">
                    Total Paid
                  </span>
                  <span className="text-2xl font-black italic tracking-tight">
                    {(order?.totalPrice ?? 0).toLocaleString()}.00 EGP
                  </span>
                </div>
              </div>

              <p className="text-[12px] italic opacity-80 text-center leading-tight">
                Tax included. Thank you for shopping with us!
              </p>
            </div>
          </motion.div>

          {/* Order Progress */}
          <motion.div
            variants={itemVariants}
            className="mt-4 border-t border-(--color-tiger)/10 pt-10"
          >
            <h3
              className="text-xl font-bold mb-10 flex items-center justify-center gap-3"
              style={{ color: "var(--color-pakistan)" }}
            >
              <div className="p-2 bg-(--color-pakistan)/10 rounded-lg">
                <Truck size={20} />
              </div>
              Current Status
            </h3>

            <div className="relative flex justify-between items-center w-full max-w-4xl mx-auto px-4 mb-20">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-(--color-tiger)/10 rounded-full -translate-y-1/2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      actualIndex === -1
                        ? "0%"
                        : `${((actualIndex + 1) / specialSteps.length) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="h-1 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                ></motion.div>
              </div>

              {/* Steps */}
              {specialSteps.map((step, idx) => {
                const Icon = step.icon;
                const active = order?.[step.key] === true;
                const current = idx === actualIndex;

                return (
                  <div
                    key={step.label}
                    className="relative z-10 flex flex-col items-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 transition-all duration-500 shadow-lg ${
                        active
                          ? "bg-green-500 border-green-400 rotate-6"
                          : "bg-(--color-tiger)/5 border-(--color-tiger)/20 shadow-inner"
                      } ${current ? "ring-4 ring-green-500/20 scale-110" : ""}`}
                    >
                      <Icon
                        size={24}
                        className={`${
                          active ? "text-white" : "text-dark/20"
                        } transition-colors`}
                      />
                    </motion.div>

                    <div className="absolute -bottom-12 w-24 text-center">
                      <p
                        className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${
                          active ? "text-green-600" : "text-dark/20"
                        }`}
                      >
                        {step.label}
                      </p>
                      {active && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="inline-block w-1 h-1 bg-green-500 rounded-full"
                        ></motion.span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {role !== "user" && order && (
            <OrderProgress order={order} refetch={refetchOrders} />
          )}
        </motion.div>
      </div>
    </>
  );
}
