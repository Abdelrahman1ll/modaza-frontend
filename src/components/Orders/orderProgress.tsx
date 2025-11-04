import {
  CheckCircle2,
  DollarSign,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function OrderProgress() {
  // عرض الخطوات
  const mainSteps = [
    { label: "Confirmed", icon: CheckCircle2, active: true },
    { label: "Shipped", icon: Package, active: false },
    { label: "Delivered", icon: Truck, active: false },
  ];
  const lastActiveIndex = [...mainSteps].reverse().findIndex((s) => s.active);
  const actualIndex =
    lastActiveIndex === -1 ? -1 : mainSteps.length - 1 - lastActiveIndex;

  // إضافة الخطوات الخاصة
  const specialSteps = [
    {
      label: "Paid",
      icon: DollarSign,
      key: "isPaid",
      color: "#4CAF50",
    },
    {
      label: "Confirmed",
      icon: CheckCircle2,
      key: "isConfirmed",
      color: "#2196F3",
    },
    {
      label: "Shipped",
      icon: Package,
      key: "isShipped",
      color: "#FF9800",
    },
    {
      label: "Delivered",
      icon: Truck,
      key: "isDelivered",
      color: "#8BC34A",
    },
    {
      label: "Canceled",
      icon: XCircle,
      key: "isCanceled",
      color: "#F44336",
    },
  ];
  const [selectedStatus, setSelectedStatus] = useState({
    isPaid: false,
    isConfirmed: false,
    isShipped: false,
    isDelivered: false,
    isCanceled: false,
  });

  const handleClick = (key: keyof typeof selectedStatus) => {
    setSelectedStatus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <div
        className="mt-10 border-t pt-5"
        style={{ borderColor: "var(--color-earth)" }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{ color: "var(--color-pakistan)" }}
        >
          Order Progress
        </h3>

        <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full -translate-y-1/2">
            <div
              className="h-1 bg-green-500 rounded-full transition-all duration-700"
              style={{
                width: `${((actualIndex + 1) / specialSteps.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Steps */}
          {mainSteps.map(({ label, icon: Icon, active }) => {
            return (
              <div
                key={label}
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
                    style={{
                      color: active ? "white" : "gray",
                    }}
                  />
                </div>
                <p
                  className={`text-sm font-medium ${
                    active ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

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

        {/* الأزرار */}
        <div className="flex flex-wrap gap-3 justify-center">
          {specialSteps.map(({ label, icon: Icon, key, color }: any) => {
            return (
              <button
                key={label}
                onClick={() => handleClick(key as keyof typeof selectedStatus)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm transition cursor-pointer hover:bg-gray-100`}
                style={{
                  borderColor: color,
                  backgroundColor: color + "33",
                  color: color,
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
