import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import {
  useGetOwnerOrdersQuery,
  useGetAdminOrdersQuery,
  useGetUserOrdersQuery,
} from "../../redux/Orders/apiOrders";
import { toast } from "react-toastify";
import { formatEndDateArabic } from "../../utils/formatters";
import type { OrderType } from "../../types/OrderType";
import { useParams } from "react-router-dom";
import { CheckCircle2, Package, Truck } from "lucide-react";

interface SpecialStep {
  label: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    color?: string;
    style?: React.CSSProperties;
  }>;
  key: keyof OrderType;
  color: string;
  active?: boolean;
}
/**
 * useOrderDetails: Logic for fetching and managing state for the order details view.
 * خطاف تفاصيل الطلب: يدير منطق جلب الحالة لجانب عرض تفاصيل الطلب.
 */
export default function useOrderDetails() {
  const { user } = useContext(AuthContext);
  const role = user?.role || "";
  const { id } = useParams<{ id: string }>();

  // استدعاء كل الـ hooks — لازم يكون برا الشروط
  const {
    data: ownerOrders,
    refetch: refetchOwnerOrders,
    isLoading: isLoadingOwnerOrders,
  } = useGetOwnerOrdersQuery(undefined, { skip: role !== "owner" });
  const {
    data: userOrders,
    refetch: refetchUserOrders,
    isLoading: isLoadingUserOrders,
  } = useGetUserOrdersQuery(undefined, { skip: role !== "user" });
  const {
    data: adminOrders,
    refetch: refetchAdminOrders,
    isLoading: isLoadingAdminOrders,
  } = useGetAdminOrdersQuery(undefined, { skip: role !== "admin" });

  // تحديد الـ orders بناء على الـ role
  let orders: OrderType[] = [];
  let refetchOrders: () => void = () => {};
  let isLoadingOrders = false;
  if (role === "owner") {
    orders = ownerOrders?.orders || [];
    refetchOrders = refetchOwnerOrders;
    isLoadingOrders = isLoadingOwnerOrders;
  } else if (role === "user") {
    orders = userOrders?.orders || [];
    refetchOrders = refetchUserOrders;
    isLoadingOrders = isLoadingUserOrders;
  } else if (role === "admin") {
    orders = adminOrders?.orders || [];
    refetchOrders = refetchAdminOrders;
    isLoadingOrders = isLoadingAdminOrders;
  } else if (user) {
    toast.error("You are not authorized to view this page.");
  }

  const order = orders.find((order) => order?.id === Number(id));

  const specialSteps: SpecialStep[] = [
    {
      label: "Confirmed",
      icon: CheckCircle2,
      key: "isConfirmed",
      color: "#2196F3",
      active: order?.isConfirmed,
    },
    {
      label: "Shipped",
      icon: Package,
      key: "isShipped",
      color: "#FF9800",
      active: order?.isShipped,
    },
    {
      label: "Delivered",
      icon: Truck,
      key: "isDelivered",
      color: "#16a34a",
      active: order?.isDelivered,
    },
  ];

  // Get LAST active step
  const lastActiveIndex = [...specialSteps]
    .reverse()
    .findIndex(
      (step: SpecialStep) => order?.[step.key as keyof OrderType] === true
    );

  const actualIndex =
    lastActiveIndex === -1 ? -1 : specialSteps.length - 1 - lastActiveIndex;

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

  return {
    order,
    specialSteps,
    actualIndex,
    formatEndDateArabic,
    refetchOrders,
    role,
    isLoadingOrders,
    paymentMethod,
    containerVariants,
    itemVariants,
  };
}
