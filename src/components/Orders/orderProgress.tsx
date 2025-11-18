import {
  CheckCircle2,
  DollarSign,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import type { OrderType } from "../../types/OrderType";
import useOrderProgress from "./useOrderProgress";

export default function OrderProgress({
  order,
  refetch,
}: {
  order: OrderType | any;
  refetch: any;
}) {
  const {
    isPaid,
    isConfirmed,
    isShipped,
    isDelivered,
    isCanceled,
    btnBaseClasses,
    getBtnStyle,
    patchIsPaid,
    patchIsConfirmed,
    patchIsShipped,
    patchIsDelivered,
    patchIsCanceled,
  } = useOrderProgress({ order });
  return (
    <div
      className="mt-10 border-t pt-5"
      style={{ borderColor: "var(--color-earth)" }}
    >
      <h3
        className="text-lg font-semibold mb-3"
        style={{ color: "var(--color-pakistan)" }}
      >
        Order Status
      </h3>

      <div className="flex flex-wrap gap-3 justify-center">
        {/* Paid */}
        <button
          onClick={async () => {
            await patchIsPaid(order?.id);
            refetch();
          }}
          className={btnBaseClasses}
          style={getBtnStyle(isPaid, "#10B981")}
        >
          <DollarSign size={16} />
          Paid
        </button>

        {/* Confirmed */}
        <button
          onClick={async () => {
            await patchIsConfirmed(order.id);
            refetch();
          }}
          className={btnBaseClasses}
          style={getBtnStyle(isConfirmed, "#2196F3")}
        >
          <CheckCircle2 size={16} />
          Confirmed
        </button>

        {/* Shipped */}
        <button
          onClick={async () => {
            await patchIsShipped(order.id);
            refetch();
          }}
          className={btnBaseClasses}
          style={getBtnStyle(isShipped, "#FF9800")}
        >
          <Package size={16} />
          Shipped
        </button>

        {/* Delivered */}
        <button
          onClick={async () => {
            await patchIsDelivered(order.id);
            refetch();
          }}
          className={btnBaseClasses}
          style={getBtnStyle(isDelivered, "#16a34a")}
        >
          <Truck size={16} />
          Delivered
        </button>

        {/* Canceled */}
        <button
          onClick={async () => {
            await patchIsCanceled(order.id);
            refetch();
          }}
          className={btnBaseClasses}
          style={getBtnStyle(isCanceled, "#F44336")}
        >
          <XCircle size={16} />
          Canceled
        </button>
      </div>
    </div>
  );
}
