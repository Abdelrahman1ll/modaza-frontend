import {
  CheckCircle2,
  DollarSign,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import type { OrderType } from "../../types/OrderType";
import useOrderProgress from "./useOrderProgress";

/**
 * OrderProgress: Visual indicator (stepper) showing the current status of an order.
 * تتبع الطلب: مؤشر مرئي يوضح الحالة الحالية لمعالجة الطلب.
 */
export default function OrderProgress({
  order,
  refetch,
}: {
  order: OrderType;
  refetch: () => void;
}) {
  const {
    isPaid,
    isConfirmed,
    isShipped,
    isDelivered,
    isCanceled,
    patchIsPaid,
    patchIsConfirmed,
    patchIsShipped,
    patchIsDelivered,
    patchIsCanceled,
  } = useOrderProgress({ order });
  return (
    <div className="mt-8 border-t border-(--color-tiger)/10 pt-8">
      <h3
        className="text-lg font-bold mb-5"
        style={{ color: "var(--color-tiger)" }}
      >
        Order Status
      </h3>

      <div className="flex flex-wrap gap-4 justify-center py-6">
        {[
          {
            label: "Paid",
            icon: DollarSign,
            active: isPaid,
            color: "#10B981",
            action: patchIsPaid,
          },
          {
            label: "Confirmed",
            icon: CheckCircle2,
            active: isConfirmed,
            color: "#3B82F6",
            action: patchIsConfirmed,
          },
          {
            label: "Shipped",
            icon: Package,
            active: isShipped,
            color: "#F59E0B",
            action: patchIsShipped,
          },
          {
            label: "Delivered",
            icon: Truck,
            active: isDelivered,
            color: "#16a34a",
            action: patchIsDelivered,
          },
          {
            label: "Canceled",
            icon: XCircle,
            active: isCanceled,
            color: "#EF4444",
            action: patchIsCanceled,
          },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={async () => {
              await btn.action(order?.id);
              refetch();
            }}
            className={`group relative flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 overflow-hidden border-2 ${
              btn.active
                ? "bg-white shadow-lg scale-[1.02]"
                : "bg-(--color-tiger)/5 border-(--color-tiger)/10 hover:border-(--color-tiger)/30 hover:bg-white hover:text-(--color-dark)/40"
            }`}
            style={btn.active ? { borderColor: btn.color } : {}}
          >
            {btn.active && (
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundColor: btn.color }}
              ></div>
            )}
            <btn.icon
              size={18}
              className="transition-transform group-hover:scale-110"
              style={btn.active ? { color: btn.color } : {}}
            />
            <span className="relative z-10">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
