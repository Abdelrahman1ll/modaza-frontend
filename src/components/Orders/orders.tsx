import { motion } from "framer-motion";
import { Package, ShoppingBag, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { OrderType } from "../../types/OrderType";
import useOrders from "./useOrders";
import { SkeletonList } from "../Skeleton";

/**
 * Orders: List of user or admin orders showing status and details.
 * الطلبات: قائمة طلبات المستخدم أو الأدمن توضح الحالة والتفاصيل.
 */
export default function Orders() {
  const { orders, isLoading, formatEndDateArabic } = useOrders();
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-1 md:px-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-(--color-pakistan) mb-8"
      >
        My Orders
      </motion.h1>

      {isLoading ? (
        <div className="w-full max-w-3xl">
          <SkeletonList count={4} />
        </div>
      ) : orders?.length === 0 ? (
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
          {orders.map((order: OrderType) => (
            <div key={order?.id}>
              <Link to={`/orders/${order?.id}`}>
                <motion.div
                  key={order?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl shadow-sm p-3 mb-4 flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center gap-1 md:gap-4">
                    <Package className="text-(--color-tiger)" size={28} />
                    <div>
                      <p className="font-semibold text-(--color-pakistan)">
                        Order ID: {order?.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order?.items.length} •{" "}
                        {formatEndDateArabic(order?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {/* السعر */}
                    <p className="font-semibold text-(--color-pakistan)">
                      {order?.totalPrice} EGP
                    </p>

                    {/* الحالة */}
                    <p
                      className={`text-sm flex items-center gap-1 justify-end
                           ${
                             order?.isDelivered
                               ? "text-green-600" // سعادة / راحة
                               : order?.isShipped
                               ? "text-orange-500" // انتظار / توقع
                               : order?.isPaid
                               ? "text-green-400" // اطمئنان
                               : order?.isConfirmed
                               ? "text-blue-500" // ثقة
                               : order?.isCanceled
                               ? "text-red-500" // خيبة أمل
                               : "text-gray-400" // محايد
                           }

                    `}
                    >
                      <Clock size={14} />
                      {order?.isDelivered
                        ? "Delivered"
                        : order?.isShipped
                        ? "Shipped"
                        : order?.isPaid
                        ? "Paid"
                        : order?.isConfirmed
                        ? "Confirmed"
                        : order?.isCanceled
                        ? "Canceled"
                        : "Processing"}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
