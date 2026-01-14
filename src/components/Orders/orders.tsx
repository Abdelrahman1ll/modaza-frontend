import { motion } from "framer-motion";
import { Package, ShoppingBag, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { OrderType } from "../../types/OrderType";
import useOrders from "./useOrders";
import { SkeletonList } from "../Skeleton";
import { BRAND_NAME } from "../../BrandText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Orders: List of user or admin orders showing status and details.
 * الطلبات: قائمة طلبات المستخدم أو الأدمن توضح الحالة والتفاصيل.
 */
export default function Orders() {
  const { orders, isLoading, formatEndDateArabic } = useOrders();

  const getStatusStyles = (order: OrderType) => {
    if (order?.isDelivered)
      return "bg-green-100 text-green-700 border-green-200";
    if (order?.isShipped)
      return "bg-orange-100 text-orange-700 border-orange-200";
    if (order?.isPaid)
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (order?.isConfirmed) return "bg-blue-100 text-blue-700 border-blue-200";
    if (order?.isCanceled) return "bg-red-100 text-red-700 border-red-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStatusText = (order: OrderType) => {
    if (order?.isDelivered) return "Delivered";
    if (order?.isShipped) return "Shipped";
    if (order?.isPaid) return "Paid";
    if (order?.isConfirmed) return "Confirmed";
    if (order?.isCanceled) return "Canceled";
    return "Processing";
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 bg-linear-to-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Order <span className="text-(--color-tiger)">History</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Track and manage all your {BRAND_NAME} purchases in one place.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-6">
            <SkeletonList count={4} />
          </div>
        ) : orders?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-6 rounded-[2.5rem] bg-white/60 backdrop-blur-md border border-gray-100 shadow-xl shadow-gray-200/50"
          >
            <div className="w-24 h-24 bg-(--color-tiger)/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={48} className="text-(--color-tiger)" />
            </div>
            <h2 className="text-2xl font-bold text-(--color-pakistan) mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Your fashion journey starts here! Explore our collection and make
              your first purchase.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-(--color-pakistan) text-white px-8 py-4 rounded-2xl font-bold hover:bg-(--color-pakistan)/80 transition-all active:scale-95 shadow-lg shadow-gray-900/20"
            >
              Start Shopping
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {orders.map((order: OrderType) => (
              <motion.div key={order?.id}>
                <Link to={`/orders/${order?.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-2xl md:rounded-4xl bg-white/60 backdrop-blur-md border border-gray-200/50 p-2 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group-hover:border-(--color-tiger)/20 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-(--color-tiger)/5 flex items-center justify-center text-(--color-tiger) group-hover:bg-(--color-tiger) group-hover:text-white transition-colors duration-500">
                          <Package size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-black text-gray-900 tracking-tight">
                              #{order?.orderNumber}
                            </h3>
                            <span
                              className={`text-[10px] px-2.5 py-1 rounded-full border font-black uppercase tracking-wider ${getStatusStyles(
                                order
                              )}`}
                            >
                              {getStatusText(order)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 font-medium">
                            {order?.items.length}{" "}
                            {order?.items.length === 1 ? "Item" : "Items"} •{" "}
                            {formatEndDateArabic(order?.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-gray-100">
                        <p className="text-2xl font-black text-gray-900">
                          {order?.totalPrice.toLocaleString()}
                          <span className="ml-1 text-[10px] uppercase text-gray-400">
                            EGP
                          </span>
                        </p>
                        <div className="flex items-center gap-1 text-xs font-bold text-(--color-tiger) opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                          View Details
                        </div>
                      </div>
                    </div>
                    {/* Decorative hover gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-tiger)/5 blur-3xl rounded-full translate-x-16 -translate-y-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
